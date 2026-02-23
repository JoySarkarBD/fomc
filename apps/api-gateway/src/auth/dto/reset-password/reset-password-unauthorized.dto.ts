import { ApiProperty } from "@nestjs/swagger";
import { CustomUnauthorizedDto } from "apps/api-gateway/src/common/dto/custom-unauthorized.dto";
import { Methods } from "apps/api-gateway/src/common/enum/methods.enum";

export class ResetPasswordUnauthorizedDto extends CustomUnauthorizedDto {
  @ApiProperty({ example: "Invalid or expired OTP" })
  declare message: string;

  @ApiProperty({ example: Methods.PATCH })
  declare method: Methods.PATCH;

  @ApiProperty({ example: "api/auth/reset-password" })
  declare endpoint: string;

  @ApiProperty({ example: 401 })
  declare statusCode: number;

  @ApiProperty({ example: "Invalid or expired OTP error details" })
  declare error: string;
}
