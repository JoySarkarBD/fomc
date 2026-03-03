import { ApiProperty } from "@nestjs/swagger";
import { CustomForbiddenDto } from "apps/api-gateway/src/common/dto/custom-forbidden.dto";
import { Methods } from "apps/api-gateway/src/common/enum/methods.enum";

export class LeaveRequestForbiddenDto extends CustomForbiddenDto {
  @ApiProperty({ example: Methods.POST })
  declare method: Methods.POST;

  @ApiProperty({ example: "api/leave/request" })
  declare endpoint: string;

  @ApiProperty({
    example: "Forbidden details error",
  })
  declare message: string;
}

export class MyLeaveForbiddenDto extends CustomForbiddenDto {
  @ApiProperty({ example: Methods.GET })
  declare method: Methods.GET;

  @ApiProperty({ example: "api/leave/my-leaves" })
  declare endpoint: string;

  @ApiProperty({
    example: "Forbidden details error",
  })
  declare message: string;
}

export class UserSpecificLeaveForbiddenDto extends CustomForbiddenDto {
  @ApiProperty({ example: Methods.GET })
  declare method: Methods.GET;

  @ApiProperty({ example: "api/leave/user-specific/:userId" })
  declare endpoint: string;

  @ApiProperty({
    example: "Forbidden details error",
  })
  declare message: string;
}

export class SpecificLeaveRequestForbiddenDto extends CustomForbiddenDto {
  @ApiProperty({ example: Methods.GET })
  declare method: Methods.GET;

  @ApiProperty({ example: "api/leave/:id" })
  declare endpoint: string;

  @ApiProperty({
    example: "Forbidden details error",
  })
  declare message: string;
}

export class LeaveRequestApprovalForbiddenDto extends CustomForbiddenDto {
  @ApiProperty({ example: Methods.PATCH })
  declare method: Methods.PATCH;

  @ApiProperty({ example: "api/leave/approve/:id" })
  declare endpoint: string;

  @ApiProperty({
    example: "Forbidden details error",
  })
  declare message: string;
}

export class LeaveRequestRejectionForbiddenDto extends CustomForbiddenDto {
  @ApiProperty({ example: Methods.PATCH })
  declare method: Methods.PATCH;

  @ApiProperty({ example: "api/leave/reject/:id" })
  declare endpoint: string;

  @ApiProperty({
    example: "Forbidden details error",
  })
  declare message: string;
}
