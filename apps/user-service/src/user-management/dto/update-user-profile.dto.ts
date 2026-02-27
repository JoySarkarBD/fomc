/** @fileoverview UpdateUserProfileDto. Validation schema for user profile updates. */
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

/**
 * Data Transfer Object for updating a user's profile fields.
 * Allows updating only name and avatar path.
 */
export class UpdateUserProfileDto {
  @ApiProperty({
    description: "The full name of the user",
    example: "John Doe",
  })
  @IsString({ message: "Name must be a string" })
  @IsNotEmpty({ message: "Name must not be empty" })
  @MaxLength(120, { message: "Name must be at most 120 characters" })
  name!: string;

  @ApiPropertyOptional({
    type: "string",
    format: "binary",
    description: "Avatar image file (optional)",
  })
  @IsOptional()
  avatar?: string; // can be a path or URL string
}
