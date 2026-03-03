/**
 * @fileoverview Leave Schema
 *
 * Mongoose schema definition for leave requests in the workforce
 * management system. Supports multiple leave types (sick, casual,
 * maternity, paternity, government festival holiday) with approval tracking.
 */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema, Types } from "mongoose";
export type LeaveDocument = Leave & Document;

/**
 * Enum for leave types within the workforce management system.
 */
export enum LeaveType {
  SICK_LEAVE = "SICK_LEAVE",
  CASUAL_LEAVE = "CASUAL_LEAVE",
  MATERNITY_LEAVE = "MATERNITY_LEAVE",
  PATERNITY_LEAVE = "PATERNITY_LEAVE",
  GOVERNMENT_FESTIVAL_HOLIDAY = "GOVERNMENT_FESTIVAL_HOLIDAY",
}

/**
 * Leave Schema
 *
 * Represents a leave request in the workforce management system.
 * Includes details such as the user requesting leave, type of leave, start and end dates, and the reason for the leave.
 *
 * Options:
 * - timestamps: automatically add `createdAt` and `updatedAt`
 * - versionKey: disables `__v` field
 */
@Schema({ timestamps: true, versionKey: false })
export class Leave extends Document {
  // Reference to the user requesting leave
  @Prop({
    type: MongooseSchema.Types.Mixed, // Mixed type to allow both string and ObjectId for user reference
    required: true,
  })
  user!: string | Types.ObjectId;

  // Type of leave being requested (e.g., sick leave, casual leave)
  @Prop({ required: true, enum: LeaveType })
  type!: LeaveType;

  // Start date of the leave
  @Prop({ required: true })
  startDate!: Date;

  // End date of the leave
  @Prop({ required: true })
  endDate!: Date;

  // Reason for requesting the leave
  @Prop({ required: true })
  reason!: string;

  // Optional field to indicate if the leave has been approved
  @Prop()
  isApproved?: boolean;

  // Optional field to indicate who approved the leave (could be a reference to a user or just a string)
  @Prop({
    type: MongooseSchema.Types.Mixed, // Mixed type to allow both string and ObjectId for approver reference
    required: true,
  })
  approvedBy?: string | Types.ObjectId;
}

/**
 * Mongoose schema for the Leave class
 */
export const LeaveSchema = SchemaFactory.createForClass(Leave);
