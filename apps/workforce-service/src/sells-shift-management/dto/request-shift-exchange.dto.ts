import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ShiftTypeForSales } from "../../schemas/attendance.schema";

export class RequestShiftExchangeDto {
  @ApiProperty({
    description: "Date for which the shift exchange is requested",
    example: "2024-05-01",
  })
  @IsNotEmpty()
  @IsDateString()
  exchangeDate!: string;

  @ApiProperty({
    description: "Current assigned shift",
    enum: ShiftTypeForSales,
    example: ShiftTypeForSales.MORNING,
  })
  @IsNotEmpty()
  @IsEnum(ShiftTypeForSales)
  originalShift!: ShiftTypeForSales;

  @ApiProperty({
    description: "Requested new shift",
    enum: ShiftTypeForSales,
    example: ShiftTypeForSales.EVENING,
  })
  @IsNotEmpty()
  @IsEnum(ShiftTypeForSales)
  newShift!: ShiftTypeForSales;

  @ApiPropertyOptional({
    description: "Reason for the shift exchange request",
    example: "Personal appointment",
  })
  @IsOptional()
  @IsString()
  reason?: string;
}
