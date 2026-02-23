/**
 * @fileoverview Authentication controller.
 *
 * Exposes public endpoints for registration, login, forgot/reset
 * password, as well as authenticated endpoints for password change
 * and logout.
 *
 * @module api-gateway/auth/controller
 */

import {
  Body,
  Controller,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import type { AuthUser } from "@shared/interfaces/auth-user.interface";
import type { Request } from "express";
import { CreateUserDto } from "../../../user-service/src/dto/create-user.dto";
import { ApiStandardResponse } from "../common/decorators/api-standard-response";
import { GetUser } from "../common/decorators/get-user.decorator";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { ForgotThrottleGuard } from "../common/throttles/forgot-throttle.guard";
import { ResetThrottleGuard } from "../common/throttles/reset-throttle.guard";
import { AuthService } from "./auth.service";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { ChangePasswordSuccessDto } from "./dto/change-password/change-password-success.dto";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { ForgotPasswordSuccessDto } from "./dto/forgot-password/forgot-password-success.dto";
import { LoginDto } from "./dto/login.dto";
import { LoginSuccessDto } from "./dto/login/login-success.dto";
import { LogoutSuccessDto } from "./dto/logout/logout-success.dto";
import { RegistrationEmailConflictDto } from "./dto/registration/registration-email-conflict.dto";
import { RegistrationRoleNotFoundDto } from "./dto/registration/registration-role-not-found.dto";
import { RegistrationSuccessDto } from "./dto/registration/registration-success.dto";
import { RegistrationValidationDto } from "./dto/registration/registration-validation.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { ResetPasswordSuccessDto } from "./dto/reset-password/reset-password-success.dto";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /** Register a new user account. */
  @ApiOperation({
    summary: "Register a new user account",
    description: "Creates a new user account with the provided details.",
  })
  @ApiStandardResponse(RegistrationSuccessDto, {
    status: 201,
    successDto: RegistrationSuccessDto,
    conflictDto: RegistrationEmailConflictDto,
    notFoundDto: RegistrationRoleNotFoundDto,
    validationDto: RegistrationValidationDto,
    conflict: true,
    notFound: true,
    internalServerError: true,
  })
  @Post("register")
  async register(@Body() data: CreateUserDto) {
    return await this.authService.register(data);
  }

  /** Authenticate with email & password, receive a bearer token. */
  @ApiOperation({
    summary: "User login",
    description:
      "Authenticates a user with email and password, returning a JWT token.",
  })
  @ApiStandardResponse(LoginSuccessDto, {
    status: 200,
    successDto: LoginSuccessDto,
    unauthorized: true,
    internalServerError: true,
  })
  @Post("login")
  async login(@Body() data: LoginDto) {
    return await this.authService.login(data.email, data.password);
  }

  /** Request a password-reset OTP (throttled per device). */
  @ApiOperation({
    summary: "Forgot password",
    description: "Sends a password reset OTP to the user's email.",
  })
  @ApiStandardResponse(ForgotPasswordSuccessDto, {
    status: 200,
    successDto: ForgotPasswordSuccessDto,
    throttle: true,
    internalServerError: true,
  })
  @Post("forgot-password")
  @UseGuards(ForgotThrottleGuard)
  async forgot(@Body() data: ForgotPasswordDto) {
    return await this.authService.forgotPassword(data.email);
  }

  /** Verify the OTP and set a new password (throttled per device). */
  @ApiOperation({
    summary: "Reset password",
    description: "Resets the user's password using a valid OTP.",
  })
  @ApiStandardResponse(ResetPasswordSuccessDto, {
    status: 200,
    successDto: ResetPasswordSuccessDto,
    unauthorized: true,
    throttle: true,
    internalServerError: true,
  })
  @Patch("reset-password")
  @UseGuards(ResetThrottleGuard)
  async reset(@Body() data: ResetPasswordDto) {
    return await this.authService.resetPassword(data.otp, data.newPassword);
  }

  /** Change own password (requires current password). */
  @ApiOperation({
    summary: "Change password",
    description: "Changes the authenticated user's password.",
  })
  @ApiStandardResponse(ChangePasswordSuccessDto, {
    status: 200,
    successDto: ChangePasswordSuccessDto,
    unauthorized: true,
    internalServerError: true,
  })
  @Patch("change-password")
  @UseGuards(JwtAuthGuard)
  async change(@GetUser() user: AuthUser, @Body() data: ChangePasswordDto) {
    return await this.authService.changePassword(
      user._id as string,
      data.currentPassword,
      data.newPassword,
    );
  }

  /** Invalidate the current bearer token (logout). */
  @ApiOperation({
    summary: "User logout",
    description: "Invalidates the current authentication token.",
  })
  @ApiStandardResponse(LogoutSuccessDto, {
    status: 200,
    successDto: LogoutSuccessDto,
    unauthorized: true,
    internalServerError: true,
  })
  @Post("logout")
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req: Request) {
    const header = req.headers.authorization;
    const headerValue = Array.isArray(header) ? header[0] : header;
    if (!headerValue) throw new UnauthorizedException("No token provided");
    const [type, tokenId] = headerValue.split(" ");
    if (!tokenId || type.toLowerCase() !== "bearer")
      throw new UnauthorizedException("Invalid token format");
    return await this.authService.logout(tokenId);
  }
}
