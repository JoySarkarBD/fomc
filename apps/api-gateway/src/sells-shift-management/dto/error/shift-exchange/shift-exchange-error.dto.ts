import { CustomForbiddenDto } from "apps/api-gateway/src/common/dto/custom-forbidden.dto";
import { CustomInternalServerErrorDto } from "apps/api-gateway/src/common/dto/custom-internal-server-error.dto";
import { CustomNotFoundDto } from "apps/api-gateway/src/common/dto/custom-not-found.dto";
import { CustomUnauthorizedDto } from "apps/api-gateway/src/common/dto/custom-unauthorized.dto";
import { ValidationErrorResponseDto } from "apps/api-gateway/src/common/dto/validation-error.dto";

export class ShiftExchangeUnauthorizedDto extends CustomUnauthorizedDto {}
export class ShiftExchangeForbiddenDto extends CustomForbiddenDto {}
export class ShiftExchangeNotFoundDto extends CustomNotFoundDto {}
export class ShiftExchangeValidationDto extends ValidationErrorResponseDto {}
export class ShiftExchangeInternalErrorDto extends CustomInternalServerErrorDto {}
