import { ApiProperty } from "@nestjs/swagger";
import { CustomInternalServerErrorDto } from "apps/api-gateway/src/common/dto/custom-internal-server-error.dto";
import { Methods } from "apps/api-gateway/src/common/enum/methods.enum";

export class RegistrationInternalErrorDto extends CustomInternalServerErrorDto {
  @ApiProperty({ example: false })
  declare success: boolean;

  @ApiProperty({ example: "Internal server error" })
  declare message: string;

  @ApiProperty({ example: Methods.POST })
  declare method: Methods.POST;

  @ApiProperty({ example: "api/auth/register" })
  declare endpoint: string;

  @ApiProperty({ example: 500 })
  declare statusCode: number;

  @ApiProperty({ example: "2026-02-23T12:00:00.000Z" })
  declare timestamp: string;

  @ApiProperty({ example: "An unexpected error occurred during registration" })
  declare error: string;
}
