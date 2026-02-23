import { ApiProperty } from "@nestjs/swagger";
import {
  FieldErrorDto,
  ValidationErrorResponseDto,
} from "apps/api-gateway/src/common/dto/validation-error.dto";
import { Methods } from "apps/api-gateway/src/common/enum/methods.enum";

export class CreateDepartmentValidationDto extends ValidationErrorResponseDto {
  @ApiProperty({ example: Methods.POST })
  declare method: Methods.POST;

  @ApiProperty({ example: "api/department" })
  declare endpoint: string;

  @ApiProperty({
    type: [FieldErrorDto],
    example: [{ field: "name", message: "Department name is required" }],
  })
  declare errors: FieldErrorDto[];
}
