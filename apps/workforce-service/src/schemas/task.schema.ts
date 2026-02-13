import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema, Types } from "mongoose";

/**
 * Mongoose document type for Task.
 */
export type TaskDocument = Task & Document;

/**
 * Enum for task priorities within the workforce management system.
 */
export enum TaskPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

/**
 * Enum for task statuses within the workforce management system.
 */
export enum TaskStatus {
  PENDING = "PENDING",
  WIP = "WORK_IN_PROGRESS",
  COMPLETED = "COMPLETED",
  BLOCKED = "BLOCKED",
  DELIVERED = "DELIVERED",
}

/**
 * Task Schema
 *
 * Represents a task in the workforce management system.
 * Includes details such as name, client, project, due date, priority, description, status, creator, and assignees.
 *
 * Options:
 * - timestamps: automatically add `createdAt` and `updatedAt`
 * - versionKey: disables `__v` field
 */
@Schema({ timestamps: true, versionKey: false })
export class Task extends Document {
  @Prop({ required: true })
  name!: string;

  // For now it will be a string but in future it will be a reference to the client collection
  @Prop({
    type: MongooseSchema.Types.Mixed, // Mixed type to allow both string and ObjectId for client reference
    required: true,
  })
  client!: string | Types.ObjectId;

  // For now it will be a string but in future it will be a reference to the project collection
  @Prop({
    type: MongooseSchema.Types.Mixed, // Mixed type to allow both string and ObjectId for project reference
    required: true,
  })
  project!: string | Types.ObjectId;

  // For now it will be a string but in future it will be a reference to the user collection
  @Prop()
  dueDate!: Date;

  // For now it will be a string but in future it will be a reference to the user collection
  @Prop({ enum: TaskPriority, default: TaskPriority.LOW })
  priority!: TaskPriority;

  // For now it will be a string but in future it will be a reference to the user collection
  @Prop()
  description?: string;

  //
  @Prop({ enum: TaskStatus, default: TaskStatus.PENDING })
  status!: TaskStatus;

  // Reference to the user collection
  @Prop({ type: Types.ObjectId, ref: "User" })
  createdBy!: Types.ObjectId;

  // Reference to the user collection
  @Prop({ type: [{ type: Types.ObjectId, ref: "User" }] })
  assignTo!: Types.ObjectId[];
}

/**
 * Mongoose schema for the Task class
 */
export const TaskSchema = SchemaFactory.createForClass(Task);
