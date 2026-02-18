/**
 * @fileoverview JWT configuration for the API Gateway.
 * Defines the secret key and token expiration settings used by JwtModule.
 */
import { JwtModuleOptions } from "@nestjs/jwt";
import config from "@shared/config/app.config";

/** JWT options used by the AuthModule's JwtModule registration. */
export const jwtConfig: JwtModuleOptions = {
  secret: config.JWT_SECRET || "your-default-jwt-secret",
  signOptions: {
    expiresIn: (config.JWT_EXPIRES_IN || 2592000) as any,
  },
};
