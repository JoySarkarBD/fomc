import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema, Types } from "mongoose";

/**
 * Mongoose document type for Project.
 */
export type ProjectDocument = Project & Document;

/**
 * Enum for project lifecycle statuses within the workforce management system.
 */
export enum ProjectStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  BLOCKED = "BLOCKED",
  DELIVERED = "DELIVERED",
}

/**
 * Enum for client moods within the workforce management system.
 */
export enum ClientMood {
  HAPPY = "HAPPY",
  NEUTRAL = "NEUTRAL",
  UNHAPPY = "UNHAPPY",
  HYPER = "HYPER",
}

/**
 * Work progress entry for tracking the history of work done on a project.
 */
@Schema({ _id: false })
export class WorkProgress {
  @Prop({ required: true })
  date!: Date;

  @Prop({ required: true, trim: true })
  progress!: string;
}

/**
 * Client mood entry for tracking the history of client moods throughout the project lifecycle.
 * This allows us to understand how the client's sentiment has evolved over time and identify any patterns or issues that may have arisen during the project.
 */
@Schema({ _id: false })
export class ClientMoodEntry {
  @Prop({ required: true })
  date!: Date;

  @Prop({ required: true, enum: ClientMood })
  mood!: ClientMood;

  @Prop()
  description?: string;
}

/**
 * Review entry for tracking feedback or comments on a project.
 */
@Schema({ _id: false })
export class Review {
  @Prop({ required: true })
  date!: Date;

  @Prop({ required: true })
  comment!: string;
}

/**
 * Department transfer entry for tracking the history of department assignments and transfers for a project.
 * This allows us to understand how the project has moved between different departments and the reasons for those transfers, which can provide insights into the project's lifecycle and any challenges it may have faced.
 */
@Schema({ _id: false })
export class DepartmentTransfer {
  @Prop({ required: true, type: Types.ObjectId })
  department!: Types.ObjectId;

  @Prop({ required: true })
  reason!: string;

  @Prop({ required: true })
  transferDate!: Date;
}

/**
 * Project Schema
 *
 * Represents a project within the workforce management.
 *
 * Features:
 * - Supports mixed client reference (string | ObjectId)
 * - Tracks work progress history
 * - Tracks client mood history
 * - Maintains department assignment and transfer history
 * - Stores lifecycle status and rating
 *
 * Options:
 * - timestamps: Adds createdAt and updatedAt automatically
 * - versionKey: Disables __v field
 */
@Schema({
  timestamps: true,
  versionKey: false,
})
export class Project extends Document {
  // Name of the project.
  @Prop({ required: true, trim: true })
  name!: string;

  // For now it will be a string but in future it will be a reference to the client collection
  @Prop({
    type: MongooseSchema.Types.Mixed, // Mixed type to allow both string and ObjectId for client reference
    required: true,
  })
  client!: string | Types.ObjectId;

  // External order identifier associated with the project.
  @Prop({ required: true, index: true })
  orderId!: string;

  // For now it will be a string but in future it will be a reference to the user collection
  @Prop({
    type: MongooseSchema.Types.Mixed, // Mixed type to allow both string and ObjectId for profile reference
    required: true,
  })
  profile!: string | Types.ObjectId;

  // Reference to the user collection
  @Prop({
    type: Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  })
  salesMember!: Types.ObjectId;

  // Departments currently assigned to handle the project.
  @Prop({
    type: [Types.ObjectId],
    required: true,
  })
  assignedDepartment!: Types.ObjectId[];

  // History of department transfers.
  @Prop({
    type: [DepartmentTransfer],
    default: [],
  })
  transferredToDepartments?: DepartmentTransfer[];

  // List of associated project file URLs or storage paths.
  @Prop({ type: [String], default: [] })
  projectFiles?: string[];

  // Internal remarks or notes about the project.
  @Prop()
  projectRemarks?: string;

  // Project due date.
  @Prop({ required: true })
  dueDate!: Date;

  // Actual delivery date of the project.
  @Prop()
  deliveryDate?: Date;

  @Prop()
  extendedDeadlines?: Date[];

  // Work progress history entries.
  @Prop({ type: [WorkProgress], default: [] })
  workProgress?: WorkProgress[];

  // Review details of the project.
  @Prop({ type: Review })
  review?: Review;

  // Rating of the project (1 to 5).

  @Prop({ min: 1, max: 5 })
  rating?: number;

  // Current lifecycle status of the project.
  @Prop({
    enum: ProjectStatus,
    default: ProjectStatus.PENDING,
    index: true,
  })
  status!: ProjectStatus;

  // Historical client mood entries.
  @Prop({ type: [ClientMoodEntry], default: [] })
  clientMoods?: ClientMoodEntry[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);

/**
 * Indexes for optimized query performance.
 *
 * Common filtering patterns considered:
 * - Dashboard status view
 * - Sales member workload
 * - Client-based filtering
 * - Department-based filtering
 * - Overdue project detection
 * - Order lookup
 */

// Client + Status (Client specific project tracking)
ProjectSchema.index({ client: 1, status: 1 });

// Sales member + Status (Workload by status)
ProjectSchema.index({ salesMember: 1, status: 1 });

// Sales member + Due date (Upcoming deadlines per sales)
ProjectSchema.index({ salesMember: 1, dueDate: 1 });

// Status + Due date (Overdue / active project filtering)
ProjectSchema.index({ status: 1, dueDate: 1 });

// Assigned department + Status (Department board view)
ProjectSchema.index({ assignedDepartment: 1, status: 1 });

// Assigned department + Due date (Department deadline view)
ProjectSchema.index({ assignedDepartment: 1, dueDate: 1 });

// Order ID (Fast lookup from order system)
ProjectSchema.index({ orderId: 1 }, { unique: true });

// Due date only (Overdue cron job queries)
ProjectSchema.index({ dueDate: 1 });

// Delivery date (Reporting & completed analytics)
ProjectSchema.index({ deliveryDate: 1 });

// CreatedAt (recent projects listing)
ProjectSchema.index({ createdAt: -1 });
