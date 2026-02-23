/**
 * @fileoverview Attendance gateway controller.
 *
 * Exposes attendance-related HTTP endpoints. Currently a stub — route
 * handlers will be uncommented as the Workforce micro-service API stabilises.
 *
 * @module api-gateway/attendance
 */

import { Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import type { AuthUser } from "@shared/interfaces";
import { GetAttendanceDto } from "apps/workforce-service/src/attendance/dto/get-attendance.dto";
import { ApiStandardResponse } from "../common/decorators/api-standard-response";
import { GetUser } from "../common/decorators/get-user.decorator";
import { Roles } from "../common/decorators/roles.decorator";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { AttendanceService } from "./attendance.service";
import { MarkAttendanceConflictDto } from "./dto/mark-attendance-conflict.dto";
import { MarkAttendanceForbiddenDto } from "./dto/mark-attendance-forbidden.dto";
import { MarkAttendanceInternalErrorDto } from "./dto/mark-attendance-internal-error.dto";
import { MarkAttendanceNotFoundDto } from "./dto/mark-attendance-not-found.dto";
import { AttendanceSuccessDto } from "./dto/attendance-success.dto";
import { MarkAttendanceThrottlerDto } from "./dto/mark-attendance-throttler.dto";
import { MarkAttendanceUnauthorizedDto } from "./dto/mark-attendance-unauthorized.dto";
import { MarkAttendanceValidationDto } from "./dto/mark-attendance-validation.dto";
import { MyAttendanceConflictDto } from "./dto/my-attendance-conflict.dto";
import { MyAttendanceForbiddenDto } from "./dto/my-attendance-forbidden.dto";
import { MyAttendanceInternalErrorDto } from "./dto/my-attendance-internal-error.dto";
import { MyAttendanceNotFoundDto } from "./dto/my-attendance-not-found.dto";
import { MyAttendanceSuccessDto } from "./dto/my-attendance-success.dto";
import { MyAttendanceThrottlerDto } from "./dto/my-attendance-throttler.dto";
import { MyAttendanceUnauthorizedDto } from "./dto/my-attendance-unauthorized.dto";
import { MyAttendanceValidationDto } from "./dto/my-attendance-validation.dto";

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
  @ApiStandardResponse(AttendanceSuccessDto, {
    status: 201,
    successDto: AttendanceSuccessDto,
    validationDto: MarkAttendanceValidationDto,
    unauthorizedDto: MarkAttendanceUnauthorizedDto,
    forbiddenDto: MarkAttendanceForbiddenDto,
    notFoundDto: MarkAttendanceNotFoundDto,
    conflictDto: MarkAttendanceConflictDto,
    throttleDto: MarkAttendanceThrottlerDto,
    internalServerErrorDto: MarkAttendanceInternalErrorDto,
    unauthorized: true,
    forbidden: true,
    notFound: true,
    conflict: true,
    throttle: true,
    internalServerError: true,
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
  @ApiStandardResponse(MyAttendanceSuccessDto, {
    status: 200,
    successDto: MyAttendanceSuccessDto,
    validationDto: MyAttendanceValidationDto,
    unauthorizedDto: MyAttendanceUnauthorizedDto,
    forbiddenDto: MyAttendanceForbiddenDto,
    notFoundDto: MyAttendanceNotFoundDto,
    conflictDto: MyAttendanceConflictDto,
    throttleDto: MyAttendanceThrottlerDto,
    internalServerErrorDto: MyAttendanceInternalErrorDto,
    isArray: true,
    unauthorized: true,
    forbidden: true,
    notFound: true,
    conflict: true,
    throttle: true,
    internalServerError: true,
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
