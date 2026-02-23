import { ApiProperty } from "@nestjs/swagger";
import { SuccessResponseDto } from "apps/api-gateway/src/common/dto/success-response.dto";
import { Methods } from "apps/api-gateway/src/common/enum/methods.enum";

export class ForgotPasswordSuccessDto extends SuccessResponseDto<null> {
  @ApiProperty({ example: true })
  declare success: boolean;

  @ApiProperty({ example: "OTP sent successfully" })
  declare message: string;

  @ApiProperty({ example: Methods.POST })
  declare method: Methods;

  @ApiProperty({ example: "api/auth/forgot-password" })
  declare endpoint: string;

  @ApiProperty({ example: 200 })
  declare statusCode: number;

  @ApiProperty({ example: "2026-02-23T12:00:00.000Z" })
  declare timestamp: string;

  @ApiProperty({ example: null, nullable: true })
  declare data: null;
}
