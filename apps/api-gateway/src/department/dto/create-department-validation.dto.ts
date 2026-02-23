import { ApiProperty } from "@nestjs/swagger";
import {
  FieldErrorDto,
  ValidationErrorResponseDto,
} from "apps/api-gateway/src/common/dto/validation-error.dto";
import { Methods } from "apps/api-gateway/src/common/enum/methods.enum";

export class CreateDepartmentValidationDto extends ValidationErrorResponseDto {
  @ApiProperty({ example: false })
  declare success: boolean;

  @ApiProperty({ example: "Validation failed" })
  declare message: string;

  @ApiProperty({ example: Methods.POST })
  declare method: Methods.POST;

  @ApiProperty({ example: "api/department" })
  declare endpoint: string;

  @ApiProperty({ example: 400 })
  declare statusCode: number;

  @ApiProperty({ example: "2026-02-23T12:00:00.000Z" })
  declare timestamp: string;

  @ApiProperty({
    type: [FieldErrorDto],
    example: [{ field: "name", message: "Department name is required" }],
  })
  declare errors: FieldErrorDto[];
}
