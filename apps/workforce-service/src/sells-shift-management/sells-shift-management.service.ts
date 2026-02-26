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
import { USER_COMMANDS } from "@shared/constants/user-command.constants";
import { Model, Types } from "mongoose";
import { firstValueFrom } from "rxjs";
import {
  SalesShiftAssignment,
  SalesShiftAssignmentDocument,
} from "../schemas/sales-shift-assignment.schema";
import {
  AssignedByDto,
  UserIdDto,
} from "./../../../../libs/shared/src/dto/mongo-id.dto";
import { CreateSellsShiftManagementDto } from "./dto/create-sells-shift-management.dto";
import { GetSellsShiftDto } from "./dto/get-sells-shift.dto";
@Injectable()
export class SellsShiftManagementService {
  constructor(
    @Inject("USER_SERVICE") private readonly userClient: ClientProxy,
    @InjectModel(SalesShiftAssignment.name)
    private readonly salesShiftAssignmentModel: Model<SalesShiftAssignmentDocument>,
  ) {}

  /**
   * Creates a new sells shift management record for a user based on the provided user ID and the details of the sells shift management to be created. This method is intended to handle the business logic for creating a new sells shift management entry in the system, ensuring that the necessary validations and data processing are performed before saving the record to the database or other data storage.
   *
   * @param {UserIdDto["userId"]} userId - The ID of the user for whom the sells shift management record is being created.
   * @param {CreateSellsShiftManagementDto} createSellsShiftManagementDto - The data transfer object containing the details of the sells shift management to be created, including the week start date, week end date, shift type, and an optional note.
   * @returns {Promise<any>} A promise that resolves to the newly created sells shift management record, or an appropriate response indicating the result of the creation process.
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
   * Retrieves sells shift management records for a specific user based on the provided user ID and optional query parameters for filtering the records by month and year. This method is intended to handle the business logic for fetching sells shift management entries from the system, ensuring that the necessary validations and data processing are performed before returning the relevant records to the caller.
   *
   * @param {UserIdDto["userId"]} userId - The ID of the user whose sells shift management records are being retrieved.
   * @param {GetSellsShiftDto} query - Optional query parameters for filtering the sells shift management records by month and year, allowing for more specific retrieval of records based on the provided criteria.
   * @returns {Promise<any>} A promise that resolves to a list of sells shift management records for the specified user, filtered according to the provided query parameters if applicable, or an appropriate response indicating the result of the retrieval process.
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
   *
   * @param userId - The ID of the user.
   * @param date - The date for which to retrieve the shift.
   * @returns The sells shift management record if found, otherwise null.
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
}
