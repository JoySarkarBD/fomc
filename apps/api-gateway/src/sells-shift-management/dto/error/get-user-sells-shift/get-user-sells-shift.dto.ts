import { ApiProperty } from "@nestjs/swagger";
import { CustomForbiddenDto } from "apps/api-gateway/src/common/dto/custom-forbidden.dto";
import { Methods } from "apps/api-gateway/src/common/enum/methods.enum";

export class GetUserSellsShiftForbiddenDto extends CustomForbiddenDto {
  @ApiProperty({ example: Methods.GET })
  declare method: Methods.GET;

  @ApiProperty({ example: "api/sells-shift-management/:userId" })
  declare endpoint: string;
}

export class GetUserSellsShiftInternalErrorDto {
  @ApiProperty({ example: Methods.GET })
  declare method: Methods.GET;

  @ApiProperty({ example: "api/sells-shift-management/:userId" })
  declare endpoint: string;
}

export class GetUserSellsShiftNotFoundDto {
  @ApiProperty({ example: Methods.GET })
  declare method: Methods.GET;

  @ApiProperty({ example: "api/sells-shift-management/:userId" })
  declare endpoint: string;

  @ApiProperty({ example: "User not found" })
  declare message: string;
}

export class GetUserSellsShiftUnauthorizedDto {
  @ApiProperty({ example: Methods.GET })
  declare method: Methods.GET;

  @ApiProperty({ example: "api/sells-shift-management/:userId" })
  declare endpoint: string;
}

export class GetUserSellsShiftValidationDto {
  @ApiProperty({ example: Methods.GET })
  declare method: Methods.GET;

  @ApiProperty({ example: "api/sells-shift-management/:userId" })
  declare endpoint: string;

  @ApiProperty({
    example: {
      month: ["month must be a number"],
      year: ["year must be a number"],
    },
  })
  declare errors: any;
}
