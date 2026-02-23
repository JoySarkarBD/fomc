import { ApiProperty } from "@nestjs/swagger";
import { CustomInternalServerErrorDto } from "apps/api-gateway/src/common/dto/custom-internal-server-error.dto";
import { Methods } from "apps/api-gateway/src/common/enum/methods.enum";

export class MyAttendanceInternalErrorDto extends CustomInternalServerErrorDto {
  @ApiProperty({ example: false })
  declare success: boolean;

  @ApiProperty({ example: "Internal server error" })
  declare message: string;

  @ApiProperty({ example: Methods.GET })
  declare method: Methods.GET;

  @ApiProperty({ example: "api/attendance/my-attendance" })
  declare endpoint: string;

  @ApiProperty({ example: 500 })
  declare statusCode: number;

  @ApiProperty({ example: "2026-02-23T12:00:00.000Z" })
  declare timestamp: string;

  @ApiProperty({ example: "Internal server error" })
  declare error: string;
}
