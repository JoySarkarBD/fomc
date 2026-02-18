/**
 * @fileoverview Forgot-password DTO.
 *
 * Validates the email submitted when requesting a password-reset OTP.
 *
 * @module api-gateway/auth/dto
 */

import { IsEmail } from "class-validator";

export class ForgotPasswordDto {
  @IsEmail({}, { message: "Email must be a valid email address" })
  email!: string;
}
