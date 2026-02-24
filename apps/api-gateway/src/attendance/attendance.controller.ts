/**
 * @fileoverview Attendance gateway controller.
 *
 * Exposes attendance-related HTTP endpoints. Currently a stub — route
 * handlers will be uncommented as the Workforce micro-service API stabilises.
 *
 * @module api-gateway/attendance
 */

import { Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { ApiHeader, ApiOperation, ApiTags } from "@nestjs/swagger";
import type { AuthUser } from "@shared/interfaces";
import { GetAttendanceDto } from "apps/workforce-service/src/attendance/dto/get-attendance.dto";
import { ApiErrorResponses } from "../common/decorators/api-error-response.decorator";
import { ApiSuccessResponse } from "../common/decorators/api-success-response.decorator";
import { GetUser } from "../common/decorators/get-user.decorator";
import { Roles } from "../common/decorators/roles.decorator";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { AttendanceService } from "./attendance.service";
import { MarkAttendanceConflictDto } from "./dto/error/attendance/mark-attendance/mark-attendance-conflict.dto";
import { MarkAttendanceForbiddenDto } from "./dto/error/attendance/mark-attendance/mark-attendance-forbidden.dto";
import { MarkAttendanceInternalErrorDto } from "./dto/error/attendance/mark-attendance/mark-attendance-internal-error.dto";
import { MarkAttendanceNotFoundDto } from "./dto/error/attendance/mark-attendance/mark-attendance-not-found.dto";
import { MarkAttendanceUnauthorizedDto } from "./dto/error/attendance/mark-attendance/mark-attendance-unauthorized.dto";
import { MyAttendanceConflictDto } from "./dto/error/attendance/my-attendance/my-attendance-conflict.dto";
import { MyAttendanceForbiddenDto } from "./dto/error/attendance/my-attendance/my-attendance-forbidden.dto";
import { MyAttendanceInternalErrorDto } from "./dto/error/attendance/my-attendance/my-attendance-internal-error.dto";
import { MyAttendanceSuccessDto } from "./dto/error/attendance/my-attendance/my-attendance-success.dto";
import { MyAttendanceUnauthorizedDto } from "./dto/error/attendance/my-attendance/my-attendance-unauthorized.dto";
import { MyAttendanceValidationDto } from "./dto/error/attendance/my-attendance/my-attendance-validation.dto";
import { AttendanceSuccessDto } from "./dto/success/attendance-success.dto";

@ApiTags("Attendance")
@Controller("attendance")
@UseGuards(JwtAuthGuard)
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  /**
   * Marks attendance for a user.
   *
   * @guards RolesGuard - Ensures that only users with specific roles can access this endpoint.
   * @param user - The authenticated user for whom attendance is being marked.
   * @returns Result of the attendance marking process.
   */
  @ApiOperation({
    summary: "Mark attendance",
    description: "Marks the authenticated user as present.",
  })
  @ApiHeader({
    name: "Authorization",
    description: "Bearer token for authentication",
    required: true,
    example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  })
  @ApiSuccessResponse(AttendanceSuccessDto, 201)
  @ApiErrorResponses({
    unauthorized: MarkAttendanceUnauthorizedDto,
    forbidden: MarkAttendanceForbiddenDto,
    notFound: MarkAttendanceNotFoundDto,
    conflict: MarkAttendanceConflictDto,
    internal: MarkAttendanceInternalErrorDto,
  })
  @Post("present")
  @UseGuards(RolesGuard)
  @Roles("HR", "PROJECT MANAGER", "TEAM LEADER", "EMPLOYEE")
  async presentAttendance(@GetUser() user: AuthUser) {
    return this.attendanceService.presentAttendance(user);
  }

  /**
   * Retrieves the attendance records for the authenticated user based on optional month and year filters.
   *
   * @guards RolesGuard - Ensures that only users with specific roles can access this endpoint.
   * @param user - The authenticated user whose attendance records are being retrieved.
   * @param query - Optional query parameters for filtering attendance records by month and year.
   * @returns The attendance records matching the specified criteria or an error message if the retrieval fails.
   */
  @ApiOperation({
    summary: "Get my attendance",
    description: "Retrieves attendance records for the authenticated user.",
  })
  @ApiHeader({
    name: "Authorization",
    description: "Bearer token for authentication",
    required: true,
    example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  })
  @ApiSuccessResponse(MyAttendanceSuccessDto, 200)
  @ApiErrorResponses({
    validation: MyAttendanceValidationDto,
    unauthorized: MyAttendanceUnauthorizedDto,
    forbidden: MyAttendanceForbiddenDto,
    conflict: MyAttendanceConflictDto,
    internal: MyAttendanceInternalErrorDto,
  })
  @Get("my-attendance")
  @UseGuards(RolesGuard)
  @Roles("HR", "PROJECT MANAGER", "TEAM LEADER", "EMPLOYEE")
  async getMyAttendance(
    @GetUser() user: AuthUser,
    @Query() query: GetAttendanceDto,
  ) {
    return await this.attendanceService.getMyAttendance(user, query);
  }
}
