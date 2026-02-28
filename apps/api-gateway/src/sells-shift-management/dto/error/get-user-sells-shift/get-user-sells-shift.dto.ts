import { ApiProperty } from "@nestjs/swagger";
import { CustomForbiddenDto } from "apps/api-gateway/src/common/dto/custom-forbidden.dto";
import { CustomInternalServerErrorDto } from "apps/api-gateway/src/common/dto/custom-internal-server-error.dto";
import { CustomNotFoundDto } from "apps/api-gateway/src/common/dto/custom-not-found.dto";
import { CustomUnauthorizedDto } from "apps/api-gateway/src/common/dto/custom-unauthorized.dto";
import {
  FieldErrorDto,
  ValidationErrorResponseDto,
} from "apps/api-gateway/src/common/dto/validation-error.dto";
import { Methods } from "apps/api-gateway/src/common/enum/methods.enum";

export class GetUserSellsShiftForbiddenDto extends CustomForbiddenDto {
  @ApiProperty({ example: Methods.GET })
  declare method: Methods.GET;

  @ApiProperty({ example: "api/sells-shift-management/:userId" })
  declare endpoint: string;
}

export class GetUserSellsShiftInternalErrorDto extends CustomInternalServerErrorDto {
  @ApiProperty({ example: Methods.GET })
  declare method: Methods.GET;

  @ApiProperty({ example: "api/sells-shift-management/:userId" })
  declare endpoint: string;
}

export class GetUserSellsShiftNotFoundDto extends CustomNotFoundDto {
  @ApiProperty({ example: Methods.GET })
  declare method: Methods.GET;

  @ApiProperty({ example: "api/sells-shift-management/:userId" })
  declare endpoint: string;

  @ApiProperty({ example: "User not found" })
  declare message: string;
}

export class GetUserSellsShiftUnauthorizedDto extends CustomUnauthorizedDto {
  @ApiProperty({ example: Methods.GET })
  declare method: Methods.GET;

  @ApiProperty({ example: "api/sells-shift-management/:userId" })
  declare endpoint: string;
}

export class GetUserSellsShiftValidationDto extends ValidationErrorResponseDto {
  @ApiProperty({ example: Methods.GET })
  declare method: Methods.GET;

  @ApiProperty({ example: "api/sells-shift-management/:userId" })
  declare endpoint: string;

  @ApiProperty({
    type: [FieldErrorDto],
    example: [
      {
        field: "month",
        message: "month must be a number between 1 and 12 - query required",
      },
      {
        field: "year",
        message: "year must be a number between 1900 and 2999 - query required",
      },
    ],
  })
  declare errors: FieldErrorDto[];
}
