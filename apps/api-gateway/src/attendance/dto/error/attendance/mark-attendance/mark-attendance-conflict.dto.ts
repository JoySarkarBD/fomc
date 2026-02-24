import { ApiProperty } from "@nestjs/swagger";
import { CustomConflictDto } from "apps/api-gateway/src/common/dto/custom-conflict.dto";
import { Methods } from "apps/api-gateway/src/common/enum/methods.enum";

export class MarkAttendanceConflictDto extends CustomConflictDto {
  @ApiProperty({ example: Methods.POST })
  declare method: Methods.POST;

  @ApiProperty({ example: "api/attendance/present" })
  declare endpoint: string;

  @ApiProperty({ example: "Attendance already marked for today" })
  declare error: string;
}
