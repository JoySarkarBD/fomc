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

export class MyLeaveNotFoundDto extends CustomNotFoundDto {
  @ApiProperty({
    example: "User not found",
  })
  declare message: string;

  @ApiProperty({ example: Methods.GET })
  declare method: Methods.GET;

  @ApiProperty({ example: "api/leave/my-leaves" })
  declare endpoint: string;

  @ApiProperty({
    example: "User not found",
  })
  declare error: string;
}

export class UserSpecificLeaveNotFoundDto extends CustomNotFoundDto {
  @ApiProperty({
    example: "User not found",
  })
  declare message: string;

  @ApiProperty({ example: Methods.GET })
  declare method: Methods.GET;

  @ApiProperty({ example: "api/leave/user-specific/:userId" })
  declare endpoint: string;

  @ApiProperty({
    example: "User not found",
  })
  declare error: string;
}

export class SpecificLeaveRequestNotFoundDto extends CustomNotFoundDto {
  @ApiProperty({
    example: "Leave request not found",
  })
  declare message: string;

  @ApiProperty({ example: Methods.GET })
  declare method: Methods.GET;

  @ApiProperty({ example: "api/leave/specific/:id" })
  declare endpoint: string;

  @ApiProperty({
    example: "Leave request not found",
  })
  declare error: string;
}

export class LeaveRequestApprovalNotFoundDto extends CustomNotFoundDto {
  @ApiProperty({
    example: "Leave request not found",
  })
  declare message: string;

  @ApiProperty({ example: Methods.PATCH })
  declare method: Methods.PATCH;

  @ApiProperty({ example: "api/leave/approve/:id" })
  declare endpoint: string;

  @ApiProperty({
    example: "Leave request not found",
  })
  declare error: string;
}

export class LeaveRequestRejectionNotFoundDto extends CustomNotFoundDto {
  @ApiProperty({
    example: "Leave request not found",
  })
  declare message: string;

  @ApiProperty({ example: Methods.PATCH })
  declare method: Methods.PATCH;

  @ApiProperty({ example: "api/leave/reject/:id" })
  declare endpoint: string;

  @ApiProperty({
    example: "Leave request not found",
  })
  declare error: string;
}
