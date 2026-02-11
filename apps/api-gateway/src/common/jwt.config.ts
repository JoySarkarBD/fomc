import { JwtModuleOptions } from "@nestjs/jwt";

/**
 * JWT configuration for NestJS JwtModule.
 *
 * This configuration is used to:
 * - Sign JWT tokens
 * - Verify JWT tokens
 *
 * Environment variables:
 * - JWT_SECRET: secret key used to sign the tokens (default: "your-default-jwt-secret")
 * - JWT_EXPIRES_IN: token expiration time (default: "7d")
 *
 * Example usage:
 * ```ts
 * JwtModule.register(jwtConfig)
 * ```
 */
export const jwtConfig: JwtModuleOptions = {
  secret: process.env.JWT_SECRET || "your-default-jwt-secret",
  signOptions: {
    expiresIn: (process.env.JWT_EXPIRES_IN || "7d") as any,
  },
};
