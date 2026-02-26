/**
 * @fileoverview Sells shift management service.
 *
 * Sends TCP commands to the Workforce micro-service for managing sells shift schedules, including creating new shift entries for users. This service acts as an intermediary between the API layer and the Workforce micro-service, handling the communication and data transformation required for sells shift management operations.
 *
 * @module api-gateway/sells-shift-management
 */

import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { SELLS_SHIFT_MANAGEMENT_COMMANDS } from "@shared/constants/sells-shift-management.constants";
import { CreateSellsShiftManagementDto } from "apps/workforce-service/src/sells-shift-management/dto/create-sells-shift-management.dto";
import { firstValueFrom } from "rxjs";

@Injectable()
export class SellsShiftManagementService {
  constructor(
    @Inject("WORKFORCE_SERVICE") private readonly workforceClient: ClientProxy,
  ) {}

  /**
   * Creates a new sells shift management entry for a user by sending a command to the Workforce micro-service. The method takes a CreateSellsShiftManagementDto as input, which contains the necessary data for creating a new sells shift management entry, including week start date, week end date, shift type, and an optional note.
   *
   *
   */
  async create(data: CreateSellsShiftManagementDto) {
    const result = await firstValueFrom(
      this.workforceClient.send(
        SELLS_SHIFT_MANAGEMENT_COMMANDS.CREATE_SELLS_SHIFT_FOR_USER,
        data,
      ),
    );
    return result;
  }
}
