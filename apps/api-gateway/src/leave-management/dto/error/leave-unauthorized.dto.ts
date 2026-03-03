import { ApiProperty } from "@nestjs/swagger";
import { CustomUnauthorizedDto } from "apps/api-gateway/src/common/dto/custom-unauthorized.dto";
import { Methods } from "apps/api-gateway/src/common/enum/methods.enum";

export class LeaveRequestUnauthorizedDto extends CustomUnauthorizedDto {
  @ApiProperty({ example: Methods.POST })
  declare method: Methods.POST;

  @ApiProperty({
    example: "api/leave/request",
  })
  declare endpoint: string;
}

export class MyLeaveUnauthorizedDto extends CustomUnauthorizedDto {
  @ApiProperty({ example: Methods.GET })
  declare method: Methods.GET;

  @ApiProperty({
    example: "api/leave/my-leaves",
  })
  declare endpoint: string;
}

export class UserSpecificLeaveUnauthorizedDto extends CustomUnauthorizedDto {
  @ApiProperty({ example: Methods.GET })
  declare method: Methods.GET;

  @ApiProperty({
    example: "api/leave/user-specific/:userId",
  })
  declare endpoint: string;
}

export class SpecificLeaveRequestUnauthorizedDto extends CustomUnauthorizedDto {
  @ApiProperty({ example: Methods.GET })
  declare method: Methods.GET;

  @ApiProperty({
    example: "api/leave/:id",
  })
  declare endpoint: string;
}

export class LeaveRequestApprovalUnauthorizedDto extends CustomUnauthorizedDto {
  @ApiProperty({ example: Methods.PATCH })
  declare method: Methods.PATCH;

  @ApiProperty({
    example: "api/leave/approve/:id",
  })
  declare endpoint: string;
}

export class LeaveRequestRejectionUnauthorizedDto extends CustomUnauthorizedDto {
  @ApiProperty({ example: Methods.PATCH })
  declare method: Methods.PATCH;

  @ApiProperty({
    example: "api/leave/reject/:id",
  })
  declare endpoint: string;
}
