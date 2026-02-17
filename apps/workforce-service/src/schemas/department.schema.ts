import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, mongo } from "mongoose";

/**
 * Mongoose document type for Department.
 */
export type DepartmentDocument = Department & Document;

/**
 * Department Schema
 *
 * Represents a department within the organization.
 * Includes the name of the department and its description.
 *
 * Options:
 * - timestamps: automatically add `createdAt` and `updatedAt`
 * - versionKey: disables `__v` field
 */
@Schema({ timestamps: true, versionKey: false })
export class Department extends Document {
  // Name of the department (e.g., "Operations", "Sales")
  @Prop({ required: true, unique: true })
  name!: string;

  // Optional description of the department
  @Prop({ default: null })
  description?: string;

  @Prop({ default: null })
  createdBy?: mongo.ObjectId; // Reference to the user who created the department
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);

// Create a text index on the 'name' field for efficient searching
DepartmentSchema.index({ name: "text" });
