import { createParamDecorator, ExecutionContext } from "@nestjs/common";

/**
 * GetUser
 *
 * Custom decorator to extract the authenticated user object
 * from the request in a controller route handler.
 */
export const GetUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    // Extract the underlying request object
    const request = ctx.switchToHttp().getRequest();

    // Return the user object attached by JwtStrategy
    return request.user;
  },
);
