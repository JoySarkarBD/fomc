/**
 * @fileoverview Sells Shift Management Service
 *
 * Provides business logic for managing sells shift management records in the Workforce service. This includes creating new records for users and retrieving existing records based on user ID.
 * The SellsShiftManagementService is designed to be used by the SellsShiftManagementController to handle incoming requests related to sells shift management operations, ensuring that the necessary business logic is applied when creating or retrieving sells shift management records in the system.
 * The service methods are currently implemented with placeholder logic and should be updated to interact with the database or other data sources as needed to manage sells shift management records effectively.
 */
import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { InjectModel } from "@nestjs/mongoose";
import { NOTIFICATION_COMMANDS } from "@shared/constants";
import { USER_COMMANDS } from "@shared/constants/user-command.constants";
import { Model, Types } from "mongoose";
import { firstValueFrom } from "rxjs";
import { NotificationType } from "../../../notification-service/src/schema/notification.schema";
import { Department, DepartmentDocument } from "../schemas/department.schema";
import {
  SalesShiftAssignment,
  SalesShiftAssignmentDocument,
} from "../schemas/sales-shift-assignment.schema";
import {
  ShiftExchange,
  ShiftExchangeDocument,
  ShiftExchangeStatus,
} from "../schemas/shift-exchange.schema";
import {
  AssignedByDto,
  UserIdDto,
} from "./../../../../libs/shared/src/dto/mongo-id.dto";
import { CreateSellsShiftManagementDto } from "./dto/create-sells-shift-management.dto";
import { GetSellsShiftDto } from "./dto/get-sells-shift.dto";
import { RequestShiftExchangeDto } from "./dto/request-shift-exchange.dto";

@Injectable()
export class SellsShiftManagementService {
  constructor(
    @Inject("USER_SERVICE") private readonly userClient: ClientProxy,
    @Inject("NOTIFICATION_SERVICE")
    private readonly notificationClient: ClientProxy,
    @InjectModel(SalesShiftAssignment.name)
    private readonly salesShiftAssignmentModel: Model<SalesShiftAssignmentDocument>,
    @InjectModel(ShiftExchange.name)
    private readonly shiftExchangeModel: Model<ShiftExchangeDocument>,
    @InjectModel(Department.name)
    private readonly departmentModel: Model<DepartmentDocument>,
  ) {}

  /**
   * Creates a new sells shift management record for a user.
   */
  async createForUser(
    assignedBy: AssignedByDto["assignedBy"],
    userId: UserIdDto["userId"],
    createSellsShiftManagementDto: CreateSellsShiftManagementDto,
  ) {
    // Fetch user from user-service
    const userExist = await firstValueFrom(
      this.userClient.send(USER_COMMANDS.GET_USER, {
        id: userId,
      }),
    );

    if (userExist?.exception) {
      return {
        message: userExist.message,
        exception: userExist.exception,
      };
    }

    // Check if assignment already exists for the same week
    const existingAssignment = await this.salesShiftAssignmentModel.findOne({
      user: new Types.ObjectId(userId),
      weekStartDate: createSellsShiftManagementDto.weekStartDate,
    });

    if (existingAssignment) {
      return {
        message: "Shift already assigned for this week",
        exception: "HttpException",
      };
    }

    const result = await this.salesShiftAssignmentModel.create({
      user: new Types.ObjectId(userId),
      weekStartDate: createSellsShiftManagementDto.weekStartDate,
      weekEndDate: createSellsShiftManagementDto.weekEndDate,
      shiftType: createSellsShiftManagementDto.shiftType,
      assignedBy: new Types.ObjectId(assignedBy),
      note: createSellsShiftManagementDto.note,
    });

    return await result.save();
  }

  /**
   * Retrieves sells shift management records for a specific user.
   */
  async findShiftForUser(userId: UserIdDto["userId"], query: GetSellsShiftDto) {
    // Fetch user from user-service
    const userExist = await firstValueFrom(
      this.userClient.send(USER_COMMANDS.GET_USER, {
        id: userId,
      }),
    );

    if (userExist.exception) {
      return {
        message: userExist.message,
        exception: userExist.exception,
      };
    }

    const result = await this.salesShiftAssignmentModel.find({
      user: new Types.ObjectId(userId),
      weekStartDate: {
        $gte: new Date(query.year, query.month - 1, 1),
        $lte: new Date(query.year, query.month, 0, 23, 59, 59, 999),
      },
    });

    return result;
  }

  /**
   * Retrieves the sells shift management record for a specific user on a specific date.
   */
  async getShiftForDate(userId: string, date: Date) {
    const todayDate = new Date(date);
    todayDate.setHours(0, 0, 0, 0);

    return await this.salesShiftAssignmentModel.findOne({
      user: new Types.ObjectId(userId),
      weekStartDate: { $lte: todayDate },
      weekEndDate: { $gte: todayDate },
    });
  }

  /**
   * Request a shift exchange (Only for Sales users).
   */
  async requestShiftExchange(
    userId: string,
    data: RequestShiftExchangeDto,
  ): Promise<any> {
    const user = await firstValueFrom(
      this.userClient.send(USER_COMMANDS.GET_USER, { id: userId }),
    );

    if (user?.exception) {
      return user;
    }

    if (user.department !== "Sales") {
      return {
        message: "Shift exchange is only available for Sales users",
        exception: "HttpException",
      };
    }

    // Verify if the user has the original shift on that date
    const exchangeDate = new Date(data.exchangeDate);
    const existingShift = await this.getShiftForDate(userId, exchangeDate);

    if (!existingShift || existingShift.shiftType !== data.originalShift) {
      return {
        message: "You do not have the specified original shift on this date",
        exception: "HttpException",
      };
    }

    const shiftExchange = await this.shiftExchangeModel.create({
      user: new Types.ObjectId(userId),
      exchangeDate: data.exchangeDate,
      originalShift: data.originalShift,
      newShift: data.newShift,
      reason: data.reason,
      status: ShiftExchangeStatus.PENDING,
    });

    // Find Sales department ID
    const salesDept = await this.departmentModel.findOne({ name: "Sales" });
    const managerIds: string[] = [];

    if (salesDept) {
      // Find managers in Sales department
      const usersRes = await firstValueFrom(
        this.userClient.send(USER_COMMANDS.GET_USERS, {
          department: [salesDept._id.toString()],
          pageNo: 1,
          pageSize: 100,
        }),
      );

      if (usersRes && Array.isArray(usersRes.users)) {
        const managers = usersRes.users.filter(
          (u: any) =>
            u.role === "PROJECT MANAGER" ||
            u.role === "DIRECTOR" ||
            u.role === "SUPER ADMIN",
        );
        managers.forEach((m: any) => managerIds.push(m._id.toString()));
      }
    }

    if (managerIds.length > 0) {
      await firstValueFrom(
        this.notificationClient.send(
          NOTIFICATION_COMMANDS.CREATE_NOTIFICATION,
          {
            receiver: managerIds,
            sender: userId,
            title: "Shift Exchange Request",
            message: `${user.name} has requested a shift exchange on ${exchangeDate.toDateString()}.`,
            type: NotificationType.SHIFT_EXCHANGE_REQUEST,
            referenceModel: "ShiftExchange",
            referenceId: shiftExchange._id.toString(),
          },
        ),
      );
    }

    return shiftExchange;
  }

  /**
   * Approve a shift exchange request.
   */
  async approveShiftExchange(exchangeId: string, managerId: string) {
    const exchange = await this.shiftExchangeModel.findById(exchangeId);
    if (!exchange) {
      return {
        message: "Exchange request not found",
        exception: "NotFoundException",
      };
    }

    if (exchange.status !== ShiftExchangeStatus.PENDING) {
      return {
        message: "Exchange request is already processed",
        exception: "HttpException",
      };
    }

    exchange.status = ShiftExchangeStatus.APPROVED;
    exchange.approvedBy = new Types.ObjectId(managerId);
    await exchange.save();

    // Update the actual shift assignment
    const assignment = await this.getShiftForDate(
      exchange.user.toString(),
      exchange.exchangeDate,
    );
    if (assignment) {
      assignment.shiftType = exchange.newShift;
      await assignment.save();
    }

    // Notify user
    await firstValueFrom(
      this.notificationClient.send(NOTIFICATION_COMMANDS.CREATE_NOTIFICATION, {
        receiver: [exchange.user.toString()],
        sender: managerId,
        title: "Shift Exchange Approved",
        message: `Your shift exchange request for ${exchange.exchangeDate.toDateString()} has been approved.`,
        type: NotificationType.SHIFT_EXCHANGE_APPROVED,
        referenceModel: "ShiftExchange",
        referenceId: exchange._id.toString(),
      }),
    );

    return exchange;
  }

  /**
   * Reject a shift exchange request.
   */
  async rejectShiftExchange(
    exchangeId: string,
    managerId: string,
    reason?: string,
  ) {
    const exchange = await this.shiftExchangeModel.findById(exchangeId);
    if (!exchange) {
      return {
        message: "Exchange request not found",
        exception: "NotFoundException",
      };
    }

    if (exchange.status !== ShiftExchangeStatus.PENDING) {
      return {
        message: "Exchange request is already processed",
        exception: "HttpException",
      };
    }

    exchange.status = ShiftExchangeStatus.REJECTED;
    exchange.approvedBy = new Types.ObjectId(managerId);
    if (reason)
      exchange.reason = `Rejected: ${reason}. Original reason: ${exchange.reason}`;
    await exchange.save();

    // Notify user
    await firstValueFrom(
      this.notificationClient.send(NOTIFICATION_COMMANDS.CREATE_NOTIFICATION, {
        receiver: [exchange.user.toString()],
        sender: managerId,
        title: "Shift Exchange Rejected",
        message: `Your shift exchange request for ${exchange.exchangeDate.toDateString()} has been rejected.`,
        type: NotificationType.SHIFT_EXCHANGE_REJECTED,
        referenceModel: "ShiftExchange",
        referenceId: exchange._id.toString(),
      }),
    );

    return exchange;
  }

  /**
   * Get all shift exchange requests for a user.
   */
  async getUserShiftExchanges(userId: string) {
    return await this.shiftExchangeModel
      .find({ user: new Types.ObjectId(userId) })
      .sort({ exchangeDate: -1 });
  }

  /**
   * Get all pending shift exchange requests (for managers).
   */
  async getPendingShiftExchanges() {
    return await this.shiftExchangeModel
      .find({ status: ShiftExchangeStatus.PENDING })
      .populate("user", "name employeeId")
      .sort({ createdAt: -1 });
  }
}
