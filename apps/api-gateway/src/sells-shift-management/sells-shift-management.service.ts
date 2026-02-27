/**
 * @fileoverview Sells shift management service.
 *
 * Sends TCP commands to the Workforce micro-service for managing sells shift schedules, including creating new shift entries for users. This service acts as an intermediary between the API layer and the Workforce micro-service, handling the communication and data transformation required for sells shift management operations.
 */

import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { SELLS_SHIFT_MANAGEMENT_COMMANDS } from "@shared/constants/sells-shift-management.constants";
import {
  ApprovedByDto,
  AssignedByDto,
  ExchangeIdDto,
  UserIdDto,
} from "@shared/dto/mongo-id.dto";
import { CreateSellsShiftManagementDto } from "apps/workforce-service/src/sells-shift-management/dto/create-sells-shift-management.dto";
import { GetSellsShiftDto } from "apps/workforce-service/src/sells-shift-management/dto/get-sells-shift.dto";
import { RequestShiftExchangeDto } from "apps/workforce-service/src/sells-shift-management/dto/request-shift-exchange.dto";
import { firstValueFrom } from "rxjs";
import { buildResponse } from "../common/response.util";

@Injectable()
export class SellsShiftManagementService {
  constructor(
    @Inject("WORKFORCE_SERVICE") private readonly workforceClient: ClientProxy,
  ) {}

  /**
   * Creates a new sells shift management entry for a user.
   *
   * @param assignedBy - The ID of the user who is assigning the shift.
   * @param userId - The ID of the user for whom the shift is being created.
   * @param data - The details of the shift to be created.
   */
  async create(
    assignedBy: AssignedByDto["assignedBy"],
    userId: UserIdDto["userId"],
    data: CreateSellsShiftManagementDto,
  ) {
    const result = await firstValueFrom(
      this.workforceClient.send(
        SELLS_SHIFT_MANAGEMENT_COMMANDS.CREATE_SELLS_SHIFT_FOR_USER,
        {
          assignedBy,
          userId,
          createSellsShiftManagementDto: data,
        },
      ),
    );

    this.handleException(result);

    return buildResponse("Sells shift created successfully", result);
  }

  /**
   * Retrieves sells shift management records for a specific user.
   *
   * @param userId - The ID of the user whose shift records are to be retrieved.
   * @param query - Optional query parameters for filtering the shift records.
   * @return A response containing the retrieved shift records or an appropriate error message if the operation fails.
   * @throws NotFoundException if no shift records are found for the specified user.
   */
  async findShiftForUser(userId: UserIdDto["userId"], query: GetSellsShiftDto) {
    const result = await firstValueFrom(
      this.workforceClient.send(
        SELLS_SHIFT_MANAGEMENT_COMMANDS.GET_USER_SELLS_SHIFT,
        {
          userId,
          query,
        },
      ),
    );

    this.handleException(result);

    return buildResponse("Sells shift retrieved", result);
  }

  /**
   * Request a shift exchange.
   *
   * @param userId - The ID of the user requesting the shift exchange.
   * @param data - The details of the shift exchange request, including the shift to be exchanged and the desired shift.
   * @return A response indicating the success of the shift exchange request submission or an appropriate error message if the operation fails.
   * @throws NotFoundException if the specified shift or user is not found.
   * @throws HttpException for any other errors that may occur during the shift exchange request process.
   */
  async requestShiftExchange(
    userId: UserIdDto["userId"],
    data: RequestShiftExchangeDto,
  ) {
    const result = await firstValueFrom(
      this.workforceClient.send(
        SELLS_SHIFT_MANAGEMENT_COMMANDS.REQUEST_SHIFT_EXCHANGE,
        {
          userId,
          requestShiftExchangeDto: data,
        },
      ),
    );

    this.handleException(result);

    return buildResponse(
      "Shift exchange request submitted successfully",
      result,
    );
  }

  /**
   * Approve a shift exchange.
   *
   * @param exchangeId - The ID of the shift exchange request to be approved.
   * @param approvedBy - The ID of the user who is approving the shift exchange request.
   * @return A response indicating the success of the shift exchange approval or an appropriate error message if the operation fails.
   * @throws NotFoundException if the specified shift exchange request is not found.
   * @throws HttpException for any other errors that may occur during the shift exchange approval process.
   */
  async approveShiftExchange(
    exchangeId: ExchangeIdDto["exchangeId"],
    approvedBy: ApprovedByDto["approvedBy"],
  ) {
    const result = await firstValueFrom(
      this.workforceClient.send(
        SELLS_SHIFT_MANAGEMENT_COMMANDS.APPROVE_SHIFT_EXCHANGE,
        {
          exchangeId,
          approvedBy,
        },
      ),
    );

    this.handleException(result);

    return buildResponse(
      "Shift exchange request approved successfully",
      result,
    );
  }

  /**
   * Reject a shift exchange.
   *
   * @param exchangeId - The ID of the shift exchange request to be rejected.
   * @param approvedBy - The ID of the user who is rejecting the shift exchange request.
   * @param reason - An optional reason for rejecting the shift exchange request.
   */
  async rejectShiftExchange(
    exchangeId: ExchangeIdDto["exchangeId"],
    approvedBy: ApprovedByDto["approvedBy"],
    reason?: string,
  ) {
    const result = await firstValueFrom(
      this.workforceClient.send(
        SELLS_SHIFT_MANAGEMENT_COMMANDS.REJECT_SHIFT_EXCHANGE,
        {
          exchangeId,
          approvedBy,
          reason,
        },
      ),
    );

    this.handleException(result);

    return buildResponse(
      "Shift exchange request rejected successfully",
      result,
    );
  }

  /**
   * Get user's shift exchanges.
   *
   * @param userId - The ID of the user whose shift exchanges are to be retrieved.
   * @return A response containing the retrieved shift exchange records or an appropriate error message if the operation fails.
   * @throws NotFoundException if no shift exchange records are found for the specified user.
   * @throws HttpException for any other errors that may occur during the retrieval of shift exchange records.
   */
  async getUserShiftExchanges(userId: UserIdDto["userId"]) {
    const result = await firstValueFrom(
      this.workforceClient.send(
        SELLS_SHIFT_MANAGEMENT_COMMANDS.GET_USER_SHIFT_EXCHANGES,
        {
          userId,
        },
      ),
    );

    this.handleException(result);

    return buildResponse("User shift exchanges retrieved", result);
  }

  /**
   * Get pending shift exchanges for managers.
   *
   * @return A response containing the retrieved pending shift exchange records or an appropriate error message if the operation fails.
   * @throws NotFoundException if no pending shift exchange records are found.
   * @throws HttpException for any other errors that may occur during the retrieval of pending shift exchange records.
   */
  async getPendingShiftExchanges() {
    const result = await firstValueFrom(
      this.workforceClient.send(
        SELLS_SHIFT_MANAGEMENT_COMMANDS.GET_PENDING_SHIFT_EXCHANGES,
        {},
      ),
    );

    this.handleException(result);

    return buildResponse("Pending shift exchanges retrieved", result);
  }

  /**
   * Handle exceptions from the Workforce micro-service responses.
   *
   * @param result - The response result from the Workforce micro-service, which may contain an exception field indicating an error.
   */
  private handleException(result: any) {
    if (result?.exception) {
      switch (result.exception) {
        case "NotFoundException":
          throw new NotFoundException(result.message);
        case "HttpException":
          throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
        case "ConflictException":
          throw new HttpException(result.message, HttpStatus.CONFLICT);
        default:
          throw new HttpException(
            result.message,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }
  }
}
