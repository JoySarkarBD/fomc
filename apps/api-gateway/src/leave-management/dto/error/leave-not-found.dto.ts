import { ApiProperty } from "@nestjs/swagger";
import { CustomNotFoundDto } from "apps/api-gateway/src/common/dto/custom-not-found.dto";
import { Methods } from "apps/api-gateway/src/common/enum/methods.enum";

export class LeaveRequestNotFoundDto extends CustomNotFoundDto {
  @ApiProperty({
    example: "User not found",
  })
  declare message: string;

  @ApiProperty({ example: Methods.POST })
  declare method: Methods.POST;

  @ApiProperty({ example: "api/leave/request" })
  declare endpoint: string;

  @ApiProperty({
    example: "User not found",
  })
  declare error: string;
}
