import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, mongo } from "mongoose";

/**
 * Mongoose document type for Designation.
 */
export type DesignationDocument = Designation & Document;

/**
 * Designation Schema
 *
 * Represents a job title or position within the organization.
 * Includes the name of the designation and its description.
 *
 * Options:
 * - timestamps: automatically add `createdAt` and `updatedAt`
 * - versionKey: disables `__v` field
 * - collection: specifies the name of the MongoDB collection
 */
@Schema({ timestamps: true, versionKey: false, collection: "designations" })
export class Designation extends Document {
  // Name of the designation (e.g., "Software Engineer", "Project Manager")
  @Prop({ required: true, unique: true })
  name!: string;

  // Optional description of the designation
  @Prop({ default: null })
  description?: string;

  @Prop()
  departmentId!: mongo.ObjectId; // Reference to the associated department

  @Prop({ default: null })
  createdBy?: mongo.ObjectId; // Reference to the user who created the role
}

export const DesignationSchema = SchemaFactory.createForClass(Designation);

// Create a text index on the 'name' field for efficient searching
DesignationSchema.index({ name: "text" });
