import { ApiProperty } from "@nestjs/swagger";
import { CustomForbiddenDto } from "apps/api-gateway/src/common/dto/custom-forbidden.dto";
import { Methods } from "apps/api-gateway/src/common/enum/methods.enum";

export class MyAttendanceForbiddenDto extends CustomForbiddenDto {
  @ApiProperty({ example: false })
  declare success: boolean;

  @ApiProperty({ example: "Forbidden" })
  declare message: string;

  @ApiProperty({ example: Methods.GET })
  declare method: Methods.GET;

  @ApiProperty({ example: "api/attendance/my-attendance" })
  declare endpoint: string;

  @ApiProperty({ example: 403 })
  declare statusCode: number;

  @ApiProperty({ example: "2026-02-23T12:00:00.000Z" })
  declare timestamp: string;

  @ApiProperty({ example: "Forbidden access" })
  declare error: string;
}
