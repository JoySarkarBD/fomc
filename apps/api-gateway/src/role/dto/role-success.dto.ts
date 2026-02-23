import { ApiProperty } from "@nestjs/swagger";
import { SuccessResponseDto } from "apps/api-gateway/src/common/dto/success-response.dto";
import { Methods } from "apps/api-gateway/src/common/enum/methods.enum";

export class RolesListSuccessDto extends SuccessResponseDto<any[]> {
  @ApiProperty({ example: "Roles fetched successfully" })
  declare message: string;

  @ApiProperty({ example: Methods.GET })
  declare method: Methods.GET;

  @ApiProperty({ example: "api/role" })
  declare endpoint: string;

  @ApiProperty({
    example: [
      {
        _id: "6996d5319754977e5498ebaf",
        name: "SUPER ADMIN",
        permissions: [],
        isBlocked: false,
        createdAt: "2026-02-19T09:17:37.094Z",
        updatedAt: "2026-02-19T09:17:37.094Z",
      },
    ],
  })
  declare data: any[];
}

export class RoleSuccessDto extends SuccessResponseDto<any> {
  @ApiProperty({ example: "Role operation successful" })
  declare message: string;

  @ApiProperty({ example: Methods.GET })
  declare method: Methods.GET;

  @ApiProperty({ example: "api/role/:id" })
  declare endpoint: string;

  @ApiProperty({
    example: {
      _id: "6996d5319754977e5498ebaf",
      name: "SUPER ADMIN",
      permissions: [],
      isBlocked: false,
      createdAt: "2026-02-19T09:17:37.094Z",
      updatedAt: "2026-02-19T09:17:37.094Z",
    },
  })
  declare data: any;
}
