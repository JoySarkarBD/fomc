import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthUser } from "@shared/interfaces/auth-user.interface";
import { ROLES_KEY } from "../decorators/roles.decorator";
import { DEPARTMENT_KEY } from "../decorators/department.decorator";

@Injectable()
export class AccessGuard implements CanActivate {
  private readonly logger = new Logger(AccessGuard.name);

  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    const requiredDepts = this.reflector.getAllAndOverride<string[]>(
      DEPARTMENT_KEY,
      [context.getHandler(), context.getClass()],
    );

    // If no restrictions are set, allow access
    if (!requiredRoles?.length && !requiredDepts?.length) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: AuthUser | undefined = request.user;

    if (!user) {
      throw new ForbiddenException("User not authenticated");
    }

    // Check Role match
    const hasRole = requiredRoles?.some(
      (role) => user.role?.toUpperCase() === role.toUpperCase(),
    );

    // Check Department match
    const hasDept = requiredDepts?.some(
      (dept) => user.department?.toUpperCase() === dept.toUpperCase(),
    );

    // Logical OR: If either condition matches, grant access
    if (hasRole || hasDept) {
      return true;
    }

    this.logger.warn(
      `Access denied for user ${user._id}. Role: ${user.role}, Dept: ${user.department}. ` +
      `Required Roles: [${requiredRoles?.join(", ")}], Required Depts: [${requiredDepts?.join(", ")}]`
    );

    throw new ForbiddenException(
      "You do not have the required role or department to access this resource."
    );
  }
}
