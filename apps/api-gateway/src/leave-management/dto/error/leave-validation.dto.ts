import { ApiProperty } from "@nestjs/swagger";
import {
  FieldErrorDto,
  ValidationErrorResponseDto,
} from "apps/api-gateway/src/common/dto/validation-error.dto";
import { Methods } from "apps/api-gateway/src/common/enum/methods.enum";

export class LeaveRequestValidationErrorDto extends ValidationErrorResponseDto {
  @ApiProperty({ example: "Leave request validation error" })
  declare message: string;

  @ApiProperty({ example: Methods.POST })
  declare method: Methods.POST;

  @ApiProperty({ example: "api/leave/request" })
  declare endpoint: string;

  @ApiProperty({ example: 201 })
  declare statusCode: number;

  @ApiProperty({
    type: [FieldErrorDto],
    example: [
      {
        field: "type",
        message:
          "type must be a valid enum SICK_LEAVE, CASUAL_LEAVE, GOVERNMENT_FESTIVAL_HOLIDAY",
      },
      {
        field: "startDate",
        message: "startDate must be a valid UTC date string - required",
      },
      {
        field: "endDate",
        message: "endDate must be a valid UTC date string - required",
      },
      {
        field: "reason",
        message: "reason must be a string - required",
      },
    ],
  })
  declare errors: FieldErrorDto[];
}
