import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { firstValueFrom } from "rxjs";
import { jwtConfig } from "../common/jwt.config";
import { USER_COMMANDS } from "../user/constants/user.constants";

/**
 * JwtStrategy
 *
 * Passport JWT strategy for authenticating requests using Bearer tokens.
 *
 * Responsibilities:
 * - Extract JWT from the Authorization header
 * - Validate the token signature using the configured secret
 * - Retrieve the user from the User microservice using the token payload
 * - Return a sanitized user object (without sensitive fields)
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * Constructor
   *
   * @param userClient ClientProxy for communicating with the User microservice
   */
  constructor(@Inject("USER_SERVICE") private userClient: ClientProxy) {
    super({
      // Extract JWT from Authorization header as Bearer token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Use secret from jwtConfig to validate token signature
      secretOrKey: jwtConfig.secret as unknown as string,
    });
  }

  /**
   * Validate method called by Passport after verifying the JWT
   *
   * @param payload The decoded JWT payload
   * @returns The user object if valid, otherwise null
   */
  async validate(payload: any) {
    const id = payload.sub; // user id from JWT payload
    if (!id) return null;

    try {
      // Fetch user from User microservice
      const user = await firstValueFrom(
        this.userClient.send(USER_COMMANDS.GET_USER, id),
      );

      if (!user) return null;

      // Remove sensitive fields before attaching user to request
      delete user.password;
      delete user.otp;
      delete user.otpExpiry;

      return user;
    } catch (err) {
      // On error, reject authentication
      return null;
    }
  }
}
