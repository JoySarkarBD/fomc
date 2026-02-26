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
   *
   * Message Pattern: { cmd: SELLS_SHIFT_MANAGEMENT_COMMANDS.CREATE_SELLS_SHIFT_FOR_USER }
   * @param {Object} payload - The payload containing the user ID and the details of the sells shift management to be created.
   * @param {UserIdDto["userId"]} payload.userId - The ID of the user for whom the sells shift management record is being created.
   * @param {CreateSellsShiftManagementDto} payload.createSellsShiftManagementDto - The data transfer object containing the details of the sells shift management to be created.
   * @returns {Promise<any>} Newly created sells shift management record.
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
   *
   * Message Pattern: { cmd: SELLS_SHIFT_MANAGEMENT_COMMANDS.GET_USER_SELLS_SHIFT }
   *
   * @param {Object} payload - The payload containing the user ID and optional query parameters for filtering the sells shift management records.
   * @param {UserIdDto["userId"]} payload.userId - The ID of the user whose sells shift management records are being retrieved.
   * @param {GetSellsShiftDto} payload.query - Optional query parameters for filtering the sells shift management records by month and year.
   * @returns {Promise<any>} List of sells shift management records for the specified user.
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
}
