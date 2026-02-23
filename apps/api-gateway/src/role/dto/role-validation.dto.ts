import { ValidationErrorResponseDto } from "apps/api-gateway/src/common/dto/validation-error.dto";

import { ApiProperty } from "@nestjs/swagger";
import { Methods } from "apps/api-gateway/src/common/enum/methods.enum";

export class RoleValidationDto extends ValidationErrorResponseDto {
  @ApiProperty({ example: "api/role" })
  declare endpoint: string;

  @ApiProperty({ example: Methods.POST })
  declare method: Methods.POST;
}
