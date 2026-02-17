import { Controller, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { AttendanceService } from "./attendance.service";

@Controller("attendance")
@UseGuards(JwtAuthGuard)
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  // @Post("present")
  // @UseGuards(RolesGuard)
  // @Roles(
  //   UserRole.HR,
  //   UserRole.PROJECT_MANAGER,
  //   UserRole.TEAM_LEADER,
  //   UserRole.EMPLOYEE,
  // )
  // async presentAttendance(@GetUser() user: AuthUser) {
  //   return this.attendanceService.presentAttendance(user);
  // }
}
