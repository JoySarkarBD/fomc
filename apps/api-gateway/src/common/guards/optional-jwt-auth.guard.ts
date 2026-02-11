import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/**
 * OptionalJwtAuthGuard
 *
 * A Passport-based JWT guard that allows requests to pass
 * even if no JWT token is provided or if authentication fails.
 *
 * Responsibilities:
 * - Attempts to validate JWT from Authorization header
 * - If JWT is valid, attaches the user to the request
 * - If JWT is missing or invalid, allows the request to continue
 *   without attaching a user
 */
@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard("jwt") {
  /**
   * Overrides default handleRequest to make JWT optional.
   *
   * @param err Error returned by Passport strategy, if any
   * @param user The authenticated user object, if token is valid
   * @returns user object if valid, otherwise null
   */
  handleRequest(err: any, user: any) {
    return user ?? null;
  }
}
