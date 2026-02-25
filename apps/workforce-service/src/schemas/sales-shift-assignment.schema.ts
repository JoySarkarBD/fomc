import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, mongo, Types } from "mongoose";
import { ShiftTypeForSales } from "./attendance.schema";

export type SalesShiftAssignmentDocument = SalesShiftAssignment & Document;

/**
 * Sales Shift Assignment Schema
 *
 * Represents the assignment of a sales shift to a user for a specific week.
 *
 * Includes references to the user, the week for which the shift is assigned, the type of shift, who assigned it, and whether it has been exchanged.
 *
 * Options:
 * - timestamps: automatically add `createdAt` and `updatedAt`
 * - versionKey: disables `__v` field
 */
@Schema({ timestamps: true, versionKey: false })
export class SalesShiftAssignment extends Document {
  // User reference
  @Prop({ type: Types.ObjectId, required: true, ref: "User" })
  user!: mongo.ObjectId;

  // Week start date (normalized: Sunday 00:00 or Monday 00:00)
  @Prop({ required: true })
  weekStartDate!: Date;

  // Week end date
  @Prop({ required: true })
  weekEndDate!: Date;

  // Assigned shift for the whole week
  @Prop({
    required: true,
    enum: Object.values(ShiftTypeForSales),
  })
  shiftType!: ShiftTypeForSales;

  // Who assigned the shift (Manager)
  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  assignedBy!: mongo.ObjectId;

  // Optional note
  @Prop({ default: null })
  note?: string;
}

export const SalesShiftAssignmentSchema =
  SchemaFactory.createForClass(SalesShiftAssignment);

// Prevent duplicate assignment per week
SalesShiftAssignmentSchema.index(
  { user: 1, weekStartDate: 1 },
  { unique: true },
);
