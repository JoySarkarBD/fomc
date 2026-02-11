import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/**
 * JwtAuthGuard
 *
 * Guard to protect routes using JWT authentication.
 * Extends Passport's built-in AuthGuard with 'jwt' strategy.
 *
 * Responsibilities:
 * - Validates JWT from Authorization header
 * - Attaches authenticated user to request object
 * - Allows access only if token is valid
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  /**
   * Determines whether the current request is allowed.
   * Delegates to Passport's canActivate method.
   *
   * @param context The execution context of the current request
   * @returns boolean | Promise<boolean> | Observable<boolean>
   */
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
}
