import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, mongo, Types } from "mongoose";

export enum PermissionName {
  USER = "USER",
  DEPARTMENT = "DEPARTMENT",
  ROLE = "ROLE",
  DESIGNATION = "DESIGNATION",
  PERMISSION = "PERMISSION",
  ATTENDANCE = "ATTENDANCE",
  LEAVE = "LEAVE",
}

/**
 * Mongoose document type for Permission.
 */
export type PermissionDocument = Permission & Document;

/**
 * Permission Schema
 *
 * Represents a specific permission within the organization.
 * Includes the name of the permission and its description.
 *
 * Options:
 * - timestamps: automatically add `createdAt` and `updatedAt`
 * - versionKey: disables `__v` field
 */
@Schema({ timestamps: true, versionKey: false })
export class Permission extends Document {
  @Prop({ type: Types.ObjectId, ref: "Role", required: true })
  role!: mongo.ObjectId; // Reference to the role associated with this permission

  @Prop({ required: true, enum: PermissionName })
  name!: PermissionName;

  @Prop({ default: null })
  description?: string;

  @Prop({ default: false })
  canCreate!: boolean;

  @Prop({ default: false })
  canRead!: boolean;

  @Prop({ default: false })
  canUpdate!: boolean;

  @Prop({ default: false })
  canDelete!: boolean;

  @Prop({ default: null })
  createdBy?: mongo.ObjectId; // Reference to the user who created the permission
}

/**
 * Mongoose document type for Permission.
 */
export const PermissionSchema = SchemaFactory.createForClass(Permission);
