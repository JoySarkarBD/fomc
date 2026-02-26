/**
 * @fileoverview Get Sells Shift DTO
 *
 * Defines the validation schema for retrieving sells shift records.
 * Allows optional month and year parameters to filter sells shift data.
 */
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt, Max, Min } from "class-validator";

/**
 * Data Transfer Object for retrieving sells shift records in the workforce service.
 * Contains optional fields for month and year, with validation rules to ensure that if provided, month must be an integer between 1 and 12, and year must be a valid integer (e.g., between 1900 and 2999).
 * The GetSellsShiftDto is used in the sells shift management service to handle get sells shift requests and ensure that the provided query parameters meet the required format before processing the request to retrieve sells shift records from the system.
 * The validation rules defined in this DTO help maintain data integrity and ensure that only valid query parameters are accepted when retrieving sells shift records through the workforce service.
 */
export class GetSellsShiftDto {
  @ApiProperty({
    required: true,
    description: "The month for which to retrieve sells shift records (1-12)",
    example: 5,
  })
  @Transform(({ value }) => (value !== undefined ? Number(value) : undefined))
  @IsInt({ message: "Month must be an integer" })
  @Min(1, { message: "Month must be between 1 and 12" })
  @Max(12, { message: "Month must be between 1 and 12" })
  month!: number;

  @ApiProperty({
    required: true,
    description: "The year for which to retrieve sells shift records",
    example: 2024,
  })
  @Transform(({ value }) => (value !== undefined ? Number(value) : undefined))
  @IsInt({ message: "Year must be an integer" })
  @Min(1900, { message: "Year must be valid" })
  @Max(2999, { message: "Year must be valid" })
  year!: number;
}
