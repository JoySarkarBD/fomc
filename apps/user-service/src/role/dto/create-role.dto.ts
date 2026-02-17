import { IsNotEmpty, IsOptional, IsString } from "class-validator";

/**
 * Data Transfer Object for creating a new role in the user service.
 * Contains fields for role name and description, with validation rules to ensure that the name is a required string and the description is an optional string.
 * The CreateRoleDto is used in the role service to handle create role requests and ensure that the provided data meets the required format before processing the request to create a new role in the system.
 * The validation rules defined in this DTO help maintain data integrity and ensure that only valid role information is accepted when creating new roles through the user service.
 */
export class CreateRoleDto {
  @IsNotEmpty()
  @IsString({ message: "Role name must be a string" })
  name!: string;

  @IsOptional()
  @IsString({ message: "Description must be a string" })
  description?: string;
}
