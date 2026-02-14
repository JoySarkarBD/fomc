import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import type { AuthUser } from "../../../api-gateway/src/common/interfaces/auth-user.interface";
import { AttendanceService } from "./attendance.service";
import { ATTENDANCE_COMMANDS } from "./constants/attendance.constants";

/**
 * Attendance Controller
 *
 * Handles all attendance-related microservice message patterns.
 * Communicates through message-based transport (e.g., TCP, RMQ, Kafka).
 */
@Controller()
export class AttendanceController {
  /**
   * Creates an instance of AttendanceController.
   *
   * @param {AttendanceService} attendanceService - Service layer responsible for attendance business logic.
   */
  constructor(private readonly attendanceService: AttendanceService) {}

  /**
   * Marks attendance for a user.
   *
   * Message Pattern: { cmd: ATTENDANCE_COMMANDS.PRESENT_ATTENDANCE }
   *
   * @param {AuthUser} payload - The authenticated user for whom attendance is being marked.
   * @returns {Promise<any>} Result of the attendance marking process.
   */
  @MessagePattern(ATTENDANCE_COMMANDS.PRESENT_ATTENDANCE)
  presentAttendance(payload: AuthUser) {
    return this.attendanceService.presentAttendance(payload);
  }

  // @MessagePattern(ATTENDANCE_COMMANDS.OUT_ATTENDANCE)
  /*   outAttendance(@Payload() outAttendanceDto: OutAttendanceDto) {
    return this.attendanceService.outAttendance(outAttendanceDto);
  } */
}
