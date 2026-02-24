import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { CustomConflictDto } from "../dto/custom-conflict.dto";
import { CustomForbiddenDto } from "../dto/custom-forbidden.dto";
import { CustomInternalServerErrorDto } from "../dto/custom-internal-server-error.dto";
import { CustomNotFoundDto } from "../dto/custom-not-found.dto";
import { CustomUnauthorizedDto } from "../dto/custom-unauthorized.dto";
import { ValidationErrorResponseDto } from "../dto/validation-error.dto";

interface ErrorDtoMap {
  validation?: any;
  unauthorized?: any;
  forbidden?: any;
  notFound?: any;
  conflict?: any;
  internal?: any;
  throttle?: any;
}

export function ApiErrorResponses(dtos: ErrorDtoMap) {
  const decorators: (MethodDecorator & ClassDecorator)[] = [];

  if (dtos.validation)
    decorators.push(
      ApiBadRequestResponse({
        type: dtos.validation || ValidationErrorResponseDto,
      }),
    );
  if (dtos.unauthorized)
    decorators.push(
      ApiUnauthorizedResponse({
        type: dtos.unauthorized || CustomUnauthorizedDto,
      }),
    );
  if (dtos.forbidden)
    decorators.push(
      ApiForbiddenResponse({ type: dtos.forbidden || CustomForbiddenDto }),
    );
  if (dtos.notFound)
    decorators.push(
      ApiNotFoundResponse({ type: dtos.notFound || CustomNotFoundDto }),
    );
  if (dtos.conflict)
    decorators.push(
      ApiConflictResponse({ type: dtos.conflict || CustomConflictDto }),
    );
  if (dtos.internal)
    decorators.push(
      ApiInternalServerErrorResponse({
        type: dtos.internal || CustomInternalServerErrorDto,
      }),
    );
  if (dtos.throttle)
    decorators.push(ApiTooManyRequestsResponse({ type: dtos.throttle }));

  return applyDecorators(...decorators);
}
