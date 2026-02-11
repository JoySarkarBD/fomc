import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { PassportModule } from "@nestjs/passport";
import { ThrottlerModule } from "@nestjs/throttler";
import { jwtConfig } from "../common/jwt.config";
import { MailModule } from "../utils/mail.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PASSWORD_THROTTLER } from "./constants/auth-throttle.constants";
import { JwtStrategy } from "./jwt.strategy";

/**
 * AuthModule
 *
 * Handles authentication-related functionality including:
 * - JWT-based authentication
 * - User login and registration
 * - Password reset and change
 * - OTP-based password recovery with rate limiting
 *
 * Integrates with the User microservice for user management
 * and MailModule for sending emails (e.g., OTPs).
 */
@Module({
  /**
   * Imported modules
   */
  imports: [
    /**
     * JwtModule
     * - Configured with custom JWT options from jwtConfig
     */
    JwtModule.register(jwtConfig),

    /**
     * PassportModule
     * - Provides JWT strategy for authentication
     */
    PassportModule.register({ defaultStrategy: "jwt" }),

    /**
     * ThrottlerModule
     * - Provides rate limiting for sensitive endpoints (forgot password, etc.)
     */
    ThrottlerModule.forRoot({
      throttlers: [PASSWORD_THROTTLER],
    }),

    /**
     * MailModule
     * - Handles sending emails (OTP, notifications)
     */
    MailModule,

    /**
     * ClientsModule
     * - Connects to the User microservice over TCP transport
     */
    ClientsModule.register([
      {
        name: "USER_SERVICE",
        transport: Transport.TCP,
        options: {
          host: process.env.USER_SERVICE_HOST ?? "127.0.0.1",
          port: Number(process.env.USER_SERVICE_PORT ?? 3001),
        },
      },
    ]),
  ],

  /**
   * Controllers
   * - AuthController handles API routes for authentication
   */
  controllers: [AuthController],

  /**
   * Providers
   * - AuthService contains the business logic
   * - JwtStrategy validates JWT tokens
   */
  providers: [AuthService, JwtStrategy],

  /**
   * Exports
   * - JwtModule, PassportModule, MailModule can be used in other modules
   */
  exports: [JwtModule, PassportModule, MailModule],
})
export class AuthModule {}
