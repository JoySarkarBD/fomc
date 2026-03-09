/**
 * @fileoverview Department Guard - RBAC enforcement based on departments.
 *
 * Works with the `@Departments()` or `@SalesOnly()` decorators to enforce access control.
 * Reads the department names set via metadata and compares them against `request.user.department`.
 */

import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthUser } from "@shared/interfaces/auth-user.interface";
import { DEPARTMENT_KEY } from "../decorators/department.decorator";

@Injectable()
export class DepartmentGuard implements CanActivate {
  private readonly logger = new Logger(DepartmentGuard.name);

  constructor(private readonly reflector: Reflector) {}

  /**
   * Determines whether the current request is allowed to proceed
   * based on the authenticated user's department.
   *
   * @param context - ExecutionContext of the current request.
   * @returns `true` if access is granted.
   * @throws {ForbiddenException} if the user is absent or the department is not allowed.
   */
  canActivate(context: ExecutionContext): boolean {
    // 1. Retrieve required departments from metadata
    const requiredDepartments = this.reflector.getAllAndOverride<string[]>(
      DEPARTMENT_KEY,
      [context.getHandler(), context.getClass()],
    );

    // No @Departments() on this route → open access (no restriction).
    if (!requiredDepartments || requiredDepartments.length === 0) {
      return true;
    }

    // 2. Extract authenticated user from the request
    const request = context.switchToHttp().getRequest();
    const user: AuthUser | undefined = request.user;

    if (!user) {
      this.logger.warn(
        `Access denied — no authenticated user on ${request.method} ${request.url}`,
      );
      throw new ForbiddenException("User not authenticated");
    }

    // 3. Ensure the user has a department assigned
    if (!user.department) {
      this.logger.warn(
        `Access denied — user ${user._id ?? user.id} has no department assigned`,
      );
      throw new ForbiddenException(
        "Your account does not have a department assigned. Contact an administrator.",
      );
    }

    // 4. Case-insensitive department comparison
    const userDept = user.department.toUpperCase();
    const normalizedRequired = requiredDepartments.map((d) => d.toUpperCase());
    const hasDepartment = normalizedRequired.includes(userDept);

    if (!hasDepartment) {
      this.logger.warn(
        `Access denied — user ${user._id ?? user.id} (department: ${user.department}) ` +
          `attempted ${request.method} ${request.url}. ` +
          `Required: [${requiredDepartments.join(", ")}]`,
      );
      throw new ForbiddenException(
        "You do not have permission to access this resource. This is restricted to specific departments.",
      );
    }

    // 5. Access granted
    this.logger.debug(
      `Access granted — user ${user._id ?? user.id} (department: ${user.department}) ` +
        `on ${request.method} ${request.url}`,
    );
    return true;
  }
}
