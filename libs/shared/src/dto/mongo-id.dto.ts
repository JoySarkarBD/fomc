/**
 * @fileoverview DTO for validating a single MongoDB ObjectId parameter.
 *
 * Use with `@Param()` on any endpoint that accepts an `:id` route param
 * to ensure it is a valid 24-character hex ObjectId.
 *
 * @module @shared/dto/mongo-id
 */

import { IsMongoId, IsNotEmpty } from "class-validator";

export class MongoIdDto {
  /** A valid 24-character MongoDB ObjectId. */
  @IsMongoId({ message: "ID must be a valid MongoDB ObjectId" })
  @IsNotEmpty({ message: "ID is required" })
  id!: string;
}
