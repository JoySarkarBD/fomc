import { Controller, Post, UseGuards } from "@nestjs/common";
import { UserRole } from "../../../user-service/src/schemas/user.schema";
import { GetUser } from "../common/decorators/get-user.decorator";
import { Roles } from "../common/decorators/roles.decorator";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import type { AuthUser } from "../common/interfaces/auth-user.interface";
import { AttendanceService } from "./attendance.service";

@Controller("attendance")
@UseGuards(JwtAuthGuard)
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post("present")
  @UseGuards(RolesGuard)
  @Roles(
    UserRole.HR,
    UserRole.PROJECT_MANAGER,
    UserRole.TEAM_LEADER,
    UserRole.EMPLOYEE,
  )
  async presentAttendance(@GetUser() user: AuthUser) {
    return this.attendanceService.presentAttendance(user);
  }
}
