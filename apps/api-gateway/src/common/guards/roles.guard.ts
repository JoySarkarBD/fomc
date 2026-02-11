import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserRole } from "../../../../user-service/src/schemas/user.schema";
import { ROLES_KEY } from "../decorators/roles.decorator";

/**
 * RolesGuard
 *
 * Guard to enforce role-based access control (RBAC) on routes.
 * Checks if the authenticated user has one of the required roles
 * defined using the @Roles() decorator.
 *
 * Responsibilities:
 * - Reads required roles from metadata using Reflector
 * - Validates that the request has an authenticated user
 * - Checks if user's role matches any of the required roles
 * - Throws ForbiddenException if user is not authenticated or lacks required role
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  /**
   * Determines if a request can proceed based on user's role.
   *
   * @param context ExecutionContext of the current request
   * @returns boolean - true if access is allowed, otherwise throws exception
   */
  canActivate(context: ExecutionContext): boolean {
    // Retrieve required roles from @Roles decorator metadata
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // If no roles are required, allow access
    if (!requiredRoles) {
      return true;
    }

    // Get authenticated user from request
    const { user } = context.switchToHttp().getRequest();

    // If user is missing, throw ForbiddenException
    if (!user) {
      throw new ForbiddenException("User not authenticated");
    }

    // Check if user has at least one of the required roles
    const hasRole = requiredRoles.some((role) => user.role === role);

    // If user does not have the required role, throw ForbiddenException
    if (!hasRole) {
      throw new ForbiddenException(
        "You do not have permission to access this resource",
      );
    }

    // User is authorized
    return true;
  }
}
