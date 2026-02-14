import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { ATTENDANCE_COMMANDS } from "../../../workforce-service/src/attendance/constants/attendance.constants";
import { AuthUser } from "../common/interfaces/auth-user.interface";
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
