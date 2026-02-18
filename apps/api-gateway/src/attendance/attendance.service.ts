/**
 * @fileoverview Attendance gateway service.
 *
 * Sends TCP commands to the Workforce micro-service for attendance
 * operations and normalises the response for the API layer.
 *
 * @module api-gateway/attendance
 */

import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ATTENDANCE_COMMANDS } from "@shared/constants/attendance-command.constants";
import { AuthUser } from "@shared/interfaces/auth-user.interface";
import { firstValueFrom } from "rxjs";
import { buildResponse } from "../common/response.util";

@Injectable()
export class AttendanceService {
  constructor(
    @Inject("WORKFORCE_SERVICE") private readonly workforceClient: ClientProxy,
  ) {}

  async presentAttendance(user: AuthUser) {
    const result = await firstValueFrom(
      this.workforceClient.send(ATTENDANCE_COMMANDS.PRESENT_ATTENDANCE, user),
    );

    switch (result?.exception) {
      case "NotFoundException":
        throw new NotFoundException(result.message);
      case "HttpException":
        throw new HttpException(result.message, HttpStatus.FORBIDDEN);
    }
    return buildResponse("Attendance marked", result);
  }
}
