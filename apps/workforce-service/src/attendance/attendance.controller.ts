import { Controller, UseGuards } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { GetUser } from "../../../api-gateway/src/common/decorators/get-user.decorator";
import { Roles } from "../../../api-gateway/src/common/decorators/roles.decorator";
import { JwtAuthGuard } from "../../../api-gateway/src/common/guards/jwt-auth.guard";
import { RolesGuard } from "../../../api-gateway/src/common/guards/roles.guard";
import type { AuthUser } from "../../../api-gateway/src/common/interfaces/auth-user.interface";
import { UserRole } from "../../../user-service/src/schemas/user.schema";
import { AttendanceService } from "./attendance.service";
import { ATTENDANCE_COMMANDS } from "./constants/attendance.constants";

@UseGuards(JwtAuthGuard)
@Controller()
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @UseGuards(RolesGuard)
  @Roles(
    UserRole.HR,
    UserRole.PROJECT_MANAGER,
    UserRole.TEAM_LEADER,
    UserRole.EMPLOYEE,
  )
  @MessagePattern(ATTENDANCE_COMMANDS.PRESENT_ATTENDANCE)
  presentAttendance(@GetUser() user: AuthUser) {
    console.log(user, "User from the workforce-service controller");
    return this.attendanceService.presentAttendance(user);
  }

  // @MessagePattern(ATTENDANCE_COMMANDS.OUT_ATTENDANCE)
  // outAttendance(@Payload() outAttendanceDto: OutAttendanceDto) {
  //   return this.attendanceService.outAttendance(outAttendanceDto);
  // }
}
