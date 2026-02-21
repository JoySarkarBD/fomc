/** @fileoverview UserSearchQueryDto. Validation schema for user search query parameters in the API Gateway. @module user-service/dto/user-search-query.dto*/
import { SearchQueryDto } from "@shared/dto";
import { IsMongoId, ValidateIf } from "class-validator";

/**
 * Data Transfer Object for validating user search query parameters in the API Gateway.
 * Contains fields for filtering users based on role, department, and designation.
 * Validates that the fields are optional and, if provided, must be valid MongoDB ObjectIds.
 * This DTO is used in the user service to handle search user requests and ensure that the provided query parameters meet the required format before processing the request to search for users in the system.
 * The validation rules defined in this DTO help maintain data integrity and ensure that only valid query parameters are accepted when searching for users through the API Gateway.
 */
export class UserSearchQueryDto extends SearchQueryDto {
  @ValidateIf((o) => o.role !== undefined && o.role !== null && o.role !== "")
  @IsMongoId({ message: "Role must be a valid MongoDB ObjectId" })
  role?: string | null;

  @ValidateIf(
    (o) =>
      o.department !== undefined &&
      o.department !== null &&
      o.department !== "",
  )
  @IsMongoId({ message: "Department must be a valid MongoDB ObjectId" })
  department?: string | null;

  @ValidateIf(
    (o) =>
      o.designation !== undefined &&
      o.designation !== null &&
      o.designation !== "",
  )
  @IsMongoId({ message: "Designation must be a valid MongoDB ObjectId" })
  designation?: string | null;
}
