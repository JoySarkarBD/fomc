import { ApiProperty } from "@nestjs/swagger";
import { ValidationErrorDto } from "apps/api-gateway/src/common/dto/validation-error.dto";
import { Methods } from "apps/api-gateway/src/common/enum/methods.enum";

export class CreateSellsShiftValidationDto extends ValidationErrorDto {
  @ApiProperty({ example: Methods.POST })
  declare method: Methods.POST;

  @ApiProperty({ example: "api/sells-shift-management/:userId" })
  declare endpoint: string;

  @ApiProperty({
    example: {
      weekStartDate: ["Date must be a valid UTC date string"],
      weekEndDate: ["Date must be a valid UTC date string"],
      shiftType: ["shiftType must be a valid ShiftTypeForSales"],
    },
  })
  declare errors: any;
}
