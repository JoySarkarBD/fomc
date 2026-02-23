import { ApiProperty } from "@nestjs/swagger";
import { CustomNotFoundDto } from "apps/api-gateway/src/common/dto/custom-not-found.dto";
import { Methods } from "apps/api-gateway/src/common/enum/methods.enum";

export class MarkAttendanceNotFoundDto extends CustomNotFoundDto {
  @ApiProperty({ example: false })
  declare success: boolean;

  @ApiProperty({ example: "Resource not found" })
  declare message: string;

  @ApiProperty({ example: Methods.POST })
  declare method: Methods.POST;

  @ApiProperty({ example: "api/attendance/present" })
  declare endpoint: string;

  @ApiProperty({ example: 404 })
  declare statusCode: number;

  @ApiProperty({ example: "2026-02-23T12:00:00.000Z" })
  declare timestamp: string;

  @ApiProperty({ example: "Resource not found" })
  declare error: string;
}
