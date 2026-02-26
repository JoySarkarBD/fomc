/**
 * @fileoverview Sells Shift Management Controller
 *
 * Handles all sells shift management-related microservice message patterns in the Workforce service. Supports operations related to creating and retrieving sells shift management records via TCP transport.
 */
import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { SELLS_SHIFT_MANAGEMENT_COMMANDS } from "@shared/constants/sells-shift-management.constants";
import { AssignedByDto, UserIdDto } from "@shared/dto/mongo-id.dto";
import { CreateSellsShiftManagementDto } from "./dto/create-sells-shift-management.dto";
import { GetSellsShiftDto } from "./dto/get-sells-shift.dto";
import { SellsShiftManagementService } from "./sells-shift-management.service";
import { RequestShiftExchangeDto } from "./dto/request-shift-exchange.dto";

/**
 * Sells Shift Management Controller
 *
 * Handles all sells shift management-related microservice message patterns.
 * Communicates through message-based transport (e.g., TCP, RMQ, Kafka).
 */
@Controller()
export class SellsShiftManagementController {
  constructor(
    private readonly sellsShiftManagementService: SellsShiftManagementService,
  ) {}

  /**
   * Create a new sells shift management record for a user.
   */
  @MessagePattern(SELLS_SHIFT_MANAGEMENT_COMMANDS.CREATE_SELLS_SHIFT_FOR_USER)
  async create(
    @Payload()
    payload: {
      assignedBy: AssignedByDto["assignedBy"];
      userId: UserIdDto["userId"];
      createSellsShiftManagementDto: CreateSellsShiftManagementDto;
    },
  ) {
    return await this.sellsShiftManagementService.createForUser(
      payload.assignedBy,
      payload.userId,
      payload.createSellsShiftManagementDto,
    );
  }

  /**
   * Retrieve sells shift management records for a specific user.
   */
  @MessagePattern(SELLS_SHIFT_MANAGEMENT_COMMANDS.GET_USER_SELLS_SHIFT)
  async findOne(
    @Payload()
    payload: {
      userId: UserIdDto["userId"];
      query: GetSellsShiftDto;
    },
  ) {
    return await this.sellsShiftManagementService.findShiftForUser(
      payload.userId,
      payload.query,
    );
  }

  /**
   * Request a shift exchange.
   */
  @MessagePattern(SELLS_SHIFT_MANAGEMENT_COMMANDS.REQUEST_SHIFT_EXCHANGE)
  async requestShiftExchange(
    @Payload()
    payload: {
      userId: string;
      requestShiftExchangeDto: RequestShiftExchangeDto;
    },
  ) {
    return await this.sellsShiftManagementService.requestShiftExchange(
      payload.userId,
      payload.requestShiftExchangeDto,
    );
  }

  /**
   * Approve a shift exchange.
   */
  @MessagePattern(SELLS_SHIFT_MANAGEMENT_COMMANDS.APPROVE_SHIFT_EXCHANGE)
  async approveShiftExchange(
    @Payload()
    payload: {
      exchangeId: string;
      managerId: string;
    },
  ) {
    return await this.sellsShiftManagementService.approveShiftExchange(
      payload.exchangeId,
      payload.managerId,
    );
  }

  /**
   * Reject a shift exchange.
   */
  @MessagePattern(SELLS_SHIFT_MANAGEMENT_COMMANDS.REJECT_SHIFT_EXCHANGE)
  async rejectShiftExchange(
    @Payload()
    payload: {
      exchangeId: string;
      managerId: string;
      reason?: string;
    },
  ) {
    return await this.sellsShiftManagementService.rejectShiftExchange(
      payload.exchangeId,
      payload.managerId,
      payload.reason,
    );
  }

  /**
   * Get user shift exchanges.
   */
  @MessagePattern(SELLS_SHIFT_MANAGEMENT_COMMANDS.GET_USER_SHIFT_EXCHANGES)
  async getUserShiftExchanges(@Payload() payload: { userId: string }) {
    return await this.sellsShiftManagementService.getUserShiftExchanges(
      payload.userId,
    );
  }

  /**
   * Get pending shift exchanges for approval.
   */
  @MessagePattern(SELLS_SHIFT_MANAGEMENT_COMMANDS.GET_PENDING_SHIFT_EXCHANGES)
  async getPendingShiftExchanges() {
    return await this.sellsShiftManagementService.getPendingShiftExchanges();
  }
}
