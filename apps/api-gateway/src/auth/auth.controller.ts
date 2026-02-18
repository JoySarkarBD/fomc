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
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import type { AuthUser } from "@shared/interfaces/auth-user.interface";
import type { Request } from "express";
import { CreateUserDto } from "../../../user-service/src/dto/create-user.dto";
import { GetUser } from "../common/decorators/get-user.decorator";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { ForgotThrottleGuard } from "../common/throttles/forgot-throttle.guard";
import { ResetThrottleGuard } from "../common/throttles/reset-throttle.guard";
import { AuthService } from "./auth.service";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { LoginDto } from "./dto/login.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /** Register a new user account. */
  @Post("register")
  async register(@Body() data: CreateUserDto) {
    return this.authService.register(data);
  }

  /** Authenticate with email & password, receive a bearer token. */
  @Post("login")
  async login(@Body() data: LoginDto) {
    return this.authService.login(data.email, data.password);
  }

  /** Request a password-reset OTP (throttled per device). */
  @Post("forgot-password")
  @UseGuards(ForgotThrottleGuard)
  async forgot(@Body() data: ForgotPasswordDto) {
    return this.authService.forgotPassword(data.email);
  }

  /** Verify the OTP and set a new password (throttled per device). */
  @Patch("reset-password")
  @UseGuards(ResetThrottleGuard)
  async reset(@Body() data: ResetPasswordDto) {
    return this.authService.resetPassword(data.otp, data.newPassword);
  }

  /** Change own password (requires current password). */
  @Put("change-password")
  @UseGuards(JwtAuthGuard)
  async change(@GetUser() user: AuthUser, @Body() data: ChangePasswordDto) {
    return this.authService.changePassword(
      user._id as string,
      data.currentPassword,
      data.newPassword,
    );
  }

  /** Invalidate the current bearer token (logout). */
  @Post("logout")
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req: Request) {
    const header = req.headers.authorization;
    const headerValue = Array.isArray(header) ? header[0] : header;
    if (!headerValue) throw new UnauthorizedException("No token provided");
    const [type, tokenId] = headerValue.split(" ");
    if (!tokenId || type.toLowerCase() !== "bearer")
      throw new UnauthorizedException("Invalid token format");
    return this.authService.logout(tokenId);
  }
}
