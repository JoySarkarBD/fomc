import { ApiProperty } from "@nestjs/swagger";
import { CustomConflictDto } from "apps/api-gateway/src/common/dto/custom-conflict.dto";
import { Methods } from "apps/api-gateway/src/common/enum/methods.enum";

export class MyAttendanceConflictDto extends CustomConflictDto {
  @ApiProperty({ example: false })
  declare success: boolean;

  @ApiProperty({ example: "Conflict" })
  declare message: string;

  @ApiProperty({ example: Methods.GET })
  declare method: Methods.GET;

  @ApiProperty({ example: "api/attendance/my-attendance" })
  declare endpoint: string;

  @ApiProperty({ example: 409 })
  declare statusCode: number;

  @ApiProperty({ example: "2026-02-23T12:00:00.000Z" })
  declare timestamp: string;

  @ApiProperty({ example: "Conflict occurred" })
  declare error: string;
}
