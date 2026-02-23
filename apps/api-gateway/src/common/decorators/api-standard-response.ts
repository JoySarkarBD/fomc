import { applyDecorators, HttpStatus, Type } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from "@nestjs/swagger";

import { CustomConflictDto } from "../dto/custom-conflict.dto";
import { CustomForbiddenDto } from "../dto/custom-forbidden.dto";
import { CustomInternalServerErrorDto } from "../dto/custom-internal-server-error.dto";
import { CustomNotFoundDto } from "../dto/custom-not-found.dto";
import { CustomTooManyRequestsDto } from "../dto/custom-throttler.dto";
import { CustomUnauthorizedDto } from "../dto/custom-unauthorized.dto";
import { SuccessResponseDto } from "../dto/success-response.dto";
import { ValidationErrorResponseDto } from "../dto/validation-error.dto";

interface ApiStandardOptions {
  status?: number;
  isArray?: boolean;

  successDto?: Type<any>;
  validationDto?: Type<any>;
  unauthorizedDto?: Type<any>;
  forbiddenDto?: Type<any>;
  notFoundDto?: Type<any>;
  conflictDto?: Type<any>;
  throttleDto?: Type<any>;
  internalServerErrorDto?: Type<any>;

  unauthorized?: boolean;
  forbidden?: boolean;
  notFound?: boolean;
  conflict?: boolean;
  internalServerError?: boolean;
  throttle?: boolean;
}

export function ApiStandardResponse<TModel extends Type<any>>(
  model: TModel,
  options?: ApiStandardOptions,
) {
  const status = options?.status ?? HttpStatus.OK;
  const isArray = options?.isArray ?? false;

  const SuccessDto = options?.successDto ?? SuccessResponseDto;
  const ValidationDto = options?.validationDto ?? ValidationErrorResponseDto;
  const UnauthorizedDto = options?.unauthorizedDto ?? CustomUnauthorizedDto;
  const ForbiddenDto = options?.forbiddenDto ?? CustomForbiddenDto;
  const NotFoundDto = options?.notFoundDto ?? CustomNotFoundDto;
  const ConflictDto = options?.conflictDto ?? CustomConflictDto;
  const ThrottlerDto = options?.throttleDto ?? CustomTooManyRequestsDto;
  const InternalErrorDto =
    options?.internalServerErrorDto ?? CustomInternalServerErrorDto;

  const dataSchema = isArray
    ? { type: "array", items: { $ref: getSchemaPath(model) } }
    : { $ref: getSchemaPath(model) };

  const decorators: Array<
    ClassDecorator | MethodDecorator | PropertyDecorator
  > = [];

  // Extra models for Swagger
  decorators.push(
    ApiExtraModels(
      SuccessDto,
      ValidationDto,
      ForbiddenDto,
      ConflictDto,
      ThrottlerDto,
      InternalErrorDto,
      ...(UnauthorizedDto ? [UnauthorizedDto] : []),
      ...(NotFoundDto ? [NotFoundDto] : []),
      model,
    ),
  );

  // Success response
  decorators.push(
    ApiResponse({
      status,
      schema: {
        allOf: [
          { $ref: getSchemaPath(SuccessDto) },
          {
            properties: {
              statusCode: { example: status },
              data: dataSchema,
            },
          },
        ],
      },
    }),
  );

  // Validation 400
  decorators.push(ApiBadRequestResponse({ type: ValidationDto }));

  // Unauthorized 401
  if (options?.unauthorized) {
    decorators.push(
      ApiUnauthorizedResponse({
        type: UnauthorizedDto ?? undefined,
        description: "Unauthorized",
      }),
    );
  }

  // Forbidden 403
  if (options?.forbidden) {
    decorators.push(
      ApiForbiddenResponse({
        type: ForbiddenDto,
        description: "Forbidden",
      }),
    );
  }

  // Not Found 404
  if (options?.notFound) {
    decorators.push(
      ApiNotFoundResponse({
        type: NotFoundDto ?? undefined,
        description: "Resource not found",
      }),
    );
  }

  // Conflict 409
  if (options?.conflict) {
    decorators.push(
      ApiConflictResponse({
        type: ConflictDto,
        description: "Conflict",
      }),
    );
  }

  // Internal Server Error 500
  if (options?.internalServerError) {
    decorators.push(
      ApiInternalServerErrorResponse({
        type: InternalErrorDto,
        description: "Internal server error",
      }),
    );
  }

  // Throttler 429
  if (options?.throttle) {
    decorators.push(
      ApiTooManyRequestsResponse({
        type: ThrottlerDto,
        description: "Too many requests",
      }),
    );
  }

  return applyDecorators(...decorators);
}
