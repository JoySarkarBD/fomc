/**
 * @fileoverview Attendance gateway controller.
 *
 * Exposes attendance-related HTTP endpoints. Currently a stub — route
 * handlers will be uncommented as the Workforce micro-service API stabilises.
 */

import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { MongoIdDto, UserIdDto } from "@shared/dto";
import type { AuthUser } from "@shared/interfaces";
import { GetLeaveDto } from "apps/workforce-service/src/leave-management/dto/get-leave.dto";
import { LeaveRequestDto } from "apps/workforce-service/src/leave-management/dto/leave-request.dto";
import { ApiErrorResponses } from "../common/decorators/api-error-response.decorator";
import { ApiSuccessResponse } from "../common/decorators/api-success-response.decorator";
import { GetUser } from "../common/decorators/get-user.decorator";
import { Roles } from "../common/decorators/roles.decorator";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import {
  LeaveRequestApprovalForbiddenDto,
  LeaveRequestForbiddenDto,
  LeaveRequestRejectionForbiddenDto,
  MyLeaveForbiddenDto,
  SpecificLeaveRequestForbiddenDto,
  UserSpecificLeaveForbiddenDto,
} from "./dto/error/leave-forbidden.dto";
import {
  LeaveRequestApprovalInternalErrorDto,
  LeaveRequestInternalErrorDto,
  LeaveRequestRejectionInternalErrorDto,
  MyLeaveInternalErrorDto,
  SpecificLeaveRequestInternalErrorDto,
  UserSpecificLeaveInternalErrorDto,
} from "./dto/error/leave-internal-error.dto";
import {
  LeaveRequestApprovalNotFoundDto,
  LeaveRequestNotFoundDto,
  LeaveRequestRejectionNotFoundDto,
  MyLeaveNotFoundDto,
  SpecificLeaveRequestNotFoundDto,
  UserSpecificLeaveNotFoundDto,
} from "./dto/error/leave-not-found.dto";
import {
  LeaveRequestApprovalUnauthorizedDto,
  LeaveRequestRejectionUnauthorizedDto,
  LeaveRequestUnauthorizedDto,
  MyLeaveUnauthorizedDto,
  SpecificLeaveRequestUnauthorizedDto,
  UserSpecificLeaveUnauthorizedDto,
} from "./dto/error/leave-unauthorized.dto";
import {
  LeaveRequestApprovalValidationErrorDto,
  LeaveRequestRejectionValidationErrorDto,
  LeaveRequestValidationErrorDto,
  MyLeaveValidationErrorDto,
  SpecificLeaveRequestValidationErrorDto,
  UserSpecificLeaveValidationErrorDto,
} from "./dto/error/leave-validation.dto";
import {
  LeaveRequestApprovalSuccessDto,
  LeaveRequestRejectionSuccessDto,
  LeaveRequestSuccessDto,
  MyLeavesSuccessDto,
  SpecificLeaveRequestSuccessDto,
  UserSpecificLeaveSuccessDto,
} from "./dto/success/leave-success.dto";
import { LeaveService } from "./leave.service";

@ApiTags("Leave Management")
@Controller("leave")
@UseGuards(JwtAuthGuard, RolesGuard)
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  @ApiOperation({ summary: "Create a new leave request" })
  @ApiBearerAuth("Authorization")
  @ApiHeader({
    name: "Authorization",
    description: "Bearer token",
    required: true,
  })
  @ApiSuccessResponse(LeaveRequestSuccessDto, 201)
  @ApiErrorResponses({
    validation: LeaveRequestValidationErrorDto,
    unauthorized: LeaveRequestUnauthorizedDto,
    forbidden: LeaveRequestForbiddenDto,
    notFound: LeaveRequestNotFoundDto,
    internal: LeaveRequestInternalErrorDto,
  })
  @Roles("SUPER ADMIN", "HR", "PROJECT MANAGER", "TEAM LEADER", "EMPLOYEE")
  @Post("request")
  async createLeaveRequest(
    @GetUser() user: AuthUser,
    @Body() data: LeaveRequestDto,
  ) {
    return await this.leaveService.createLeaveRequest(
      (user._id ?? user.id) as UserIdDto["userId"],
      data,
    );
  }

  @ApiOperation({ summary: "Retrieve user-specific leaves" })
  @ApiBearerAuth("Authorization")
  @ApiHeader({
    name: "Authorization",
    description: "Bearer token",
    required: true,
  })
  @ApiSuccessResponse(MyLeavesSuccessDto)
  @ApiErrorResponses({
    validation: MyLeaveValidationErrorDto,
    unauthorized: MyLeaveUnauthorizedDto,
    forbidden: MyLeaveForbiddenDto,
    notFound: MyLeaveNotFoundDto,
    internal: MyLeaveInternalErrorDto,
  })
  @Roles("SUPER ADMIN", "HR", "PROJECT MANAGER", "TEAM LEADER", "EMPLOYEE")
  @Get("my-leaves")
  async getMyLeaves(@GetUser() user: AuthUser, @Query() query: GetLeaveDto) {
    return await this.leaveService.getUserSpecificLeaves(
      (user._id ?? user.id) as UserIdDto["userId"],
      query,
    );
  }

  @ApiOperation({ summary: "Retrieve a specific leave request by ID" })
  @ApiBearerAuth("Authorization")
  @ApiHeader({
    name: "Authorization",
    description: "Bearer token",
    required: true,
  })
  @ApiSuccessResponse(UserSpecificLeaveSuccessDto)
  @ApiErrorResponses({
    validation: UserSpecificLeaveValidationErrorDto,
    unauthorized: UserSpecificLeaveUnauthorizedDto,
    forbidden: UserSpecificLeaveForbiddenDto,
    notFound: UserSpecificLeaveNotFoundDto,
    internal: UserSpecificLeaveInternalErrorDto,
  })
  @Roles("SUPER ADMIN", "HR", "PROJECT MANAGER", "TEAM LEADER", "EMPLOYEE")
  @Get("user-specific/:userId")
  async getUserSpecificLeaves(
    @Param() params: UserIdDto,
    @Query() query: GetLeaveDto,
  ) {
    return await this.leaveService.getUserSpecificLeaves(params.userId, query);
  }

  @ApiOperation({ summary: "Retrieve a specific leave request by ID" })
  @ApiBearerAuth("Authorization")
  @ApiSuccessResponse(SpecificLeaveRequestSuccessDto)
  @ApiErrorResponses({
    validation: SpecificLeaveRequestValidationErrorDto,
    unauthorized: SpecificLeaveRequestUnauthorizedDto,
    forbidden: SpecificLeaveRequestForbiddenDto,
    notFound: SpecificLeaveRequestNotFoundDto,
    internal: SpecificLeaveRequestInternalErrorDto,
  })
  @ApiHeader({
    name: "Authorization",
    description: "Bearer token",
    required: true,
  })
  @Roles("SUPER ADMIN", "HR", "PROJECT MANAGER", "TEAM LEADER", "EMPLOYEE")
  @Get(":id")
  async getLeaveById(@Param() params: MongoIdDto) {
    return await this.leaveService.getLeaveById(params.id);
  }

  @ApiOperation({ summary: "Approve a leave request" })
  @ApiBearerAuth("Authorization")
  @ApiHeader({
    name: "Authorization",
    description: "Bearer token",
    required: true,
  })
  @ApiSuccessResponse(LeaveRequestApprovalSuccessDto)
  @ApiErrorResponses({
    validation: LeaveRequestApprovalValidationErrorDto,
    unauthorized: LeaveRequestApprovalUnauthorizedDto,
    forbidden: LeaveRequestApprovalForbiddenDto,
    notFound: LeaveRequestApprovalNotFoundDto,
    internal: LeaveRequestApprovalInternalErrorDto,
  })
  @Roles("SUPER ADMIN", "HR", "PROJECT MANAGER", "TEAM LEADER", "EMPLOYEE")
  @Patch("approve/:id")
  async approveLeaveRequest(
    @Param() params: MongoIdDto,
    @GetUser() user: AuthUser,
  ) {
    return await this.leaveService.approveLeaveRequestByAuthority(
      (user._id ?? user.id) as UserIdDto["userId"],
      params.id,
    );
  }

  @ApiOperation({ summary: "Reject a leave request" })
  @ApiBearerAuth("Authorization")
  @ApiHeader({
    name: "Authorization",
    description: "Bearer token",
    required: true,
  })
  @ApiSuccessResponse(LeaveRequestRejectionSuccessDto)
  @ApiErrorResponses({
    validation: LeaveRequestRejectionValidationErrorDto,
    unauthorized: LeaveRequestRejectionUnauthorizedDto,
    forbidden: LeaveRequestRejectionForbiddenDto,
    notFound: LeaveRequestRejectionNotFoundDto,
    internal: LeaveRequestRejectionInternalErrorDto,
  })
  @Roles("SUPER ADMIN", "HR", "PROJECT MANAGER", "TEAM LEADER", "EMPLOYEE")
  @Patch("reject/:id")
  async rejectLeaveRequest(
    @Param() params: MongoIdDto,
    @GetUser() user: AuthUser,
  ) {
    return await this.leaveService.rejectLeaveRequestByAuthority(
      (user._id ?? user.id) as UserIdDto["userId"],
      params.id,
    );
  }
}
