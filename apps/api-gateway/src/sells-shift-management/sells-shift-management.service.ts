/**
 * @fileoverview Sells shift management service.
 *
 * Sends TCP commands to the Workforce micro-service for managing sells shift schedules, including creating new shift entries for users. This service acts as an intermediary between the API layer and the Workforce micro-service, handling the communication and data transformation required for sells shift management operations.
 *
 * @module api-gateway/sells-shift-management
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
import { AssignedByDto, UserIdDto } from "@shared/dto/mongo-id.dto";
import { CreateSellsShiftManagementDto } from "apps/workforce-service/src/sells-shift-management/dto/create-sells-shift-management.dto";
import { GetSellsShiftDto } from "apps/workforce-service/src/sells-shift-management/dto/get-sells-shift.dto";
import { firstValueFrom } from "rxjs";
import { buildResponse } from "../common/response.util";

@Injectable()
export class SellsShiftManagementService {
  constructor(
    @Inject("WORKFORCE_SERVICE") private readonly workforceClient: ClientProxy,
  ) {}

  /**
   * Creates a new sells shift management entry for a user by sending a command to the Workforce micro-service.
   *
   * @param assignedBy - The ID of the user who is assigning the shift.
   * @param userId - The ID of the user for whom the shift is being created.
   * @param data - The data for creating a new sells shift management entry.
   * @returns Result of the creation process.
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

    switch (result?.exception) {
      case "NotFoundException":
        throw new NotFoundException(result.message);
      case "HttpException":
        throw new HttpException(result.message, HttpStatus.FORBIDDEN);
    }

    return buildResponse("Sells shift created successfully", result);
  }

  /**
   * Retrieves sells shift management records for a specific user.
   *
   * @param userId - The ID of the user whose sells shift records are being retrieved.
   * @param query - Query parameters for filtering the records.
   * @returns List of sells shift records for the specified user.
   */
  async findShiftForUser(userId: UserIdDto["userId"], query: GetSellsShiftDto) {
    const result = await firstValueFrom(
      this.workforceClient.send(SELLS_SHIFT_MANAGEMENT_COMMANDS.GET_USER_SELLS_SHIFT, {
        userId,
        query,
      }),
    );

    switch (result?.exception) {
      case "NotFoundException":
        throw new NotFoundException(result.message);
    }

    return buildResponse("Sells shift retrieved", result);
  }
}
