import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

/**
 * Mongoose document type for User.
 */
export type UserDocument = User & Document;

/**
 * Enum for user roles within the organization.
 */
export enum UserRole {
  DIRECTOR = "DIRECTOR",
  HR = "HR",
  PROJECT_MANAGER = "PROJECT_MANAGER",
  TEAM_LEADER = "TEAM_LEADER",
  EMPLOYEE = "EMPLOYEE",
}

/**
 * Enum for departments within the organization.
 */
export enum Department {
  /*   SHOPIFY = "SHOPIFY",
  WORDPRESS = "WORDPRESS",
  CUSTOM = "CUSTOM", */
  OPERATIONS = "OPERATIONS",
  SALES = "SALES",
}

/**
 * User Schema
 *
 * Represents an employee in the organization.
 * Includes personal, role, and department information.
 *
 * Options:
 * - timestamps: automatically add `createdAt` and `updatedAt`
 * - versionKey: disables `__v` field
 */
@Schema({ timestamps: true, versionKey: false })
export class User extends Document {
  // Full name of the user
  @Prop({ required: true })
  name!: string;

  // Optional employee identifier
  @Prop({ default: null, unique: true, sparse: true, uppercase: true })
  employeeId?: string;

  // Primary phone number (required)
  @Prop({ required: true })
  phoneNumber?: string;

  // Unique email address (required)
  @Prop({ required: true, unique: true })
  email!: string;

  // Optional secondary email
  @Prop({ default: null })
  secondaryEmail?: string;

  // User password (required, excluded from queries by default)
  @Prop({ required: true, select: false })
  password?: string;

  // OTP for password reset flows
  @Prop({
    type: String,
    default: null,
    maxlength: 6,
    minlength: 6,
    select: false,
  })
  otp?: string | null;

  // Expiry date for the OTP
  @Prop({ type: Date, default: null, select: false })
  otpExpiry?: Date | null;

  // Role of the user in the organization
  @Prop({ default: UserRole.EMPLOYEE, enum: UserRole })
  role: UserRole = UserRole.EMPLOYEE;

  // Department of the user (optional)
  @Prop({ default: null, enum: Department })
  department?: Department;

  // Employment status (active/inactive)
  @Prop({ type: Boolean, default: true })
  employmentStatus!: boolean;

  // Date of resignations
  @Prop()
  resignedDates?: Date[];

  // Date(s) of re-joining the organization
  @Prop()
  reJoiningDates?: Date[];
}

/**
 * Mongoose schema for the User class
 */
export const UserSchema = SchemaFactory.createForClass(User);

/**
 * Index for faster queries on commonly filtered fields:
 * - role: to quickly find users by their role (e.g., all employees, all managers).
 * - department: to quickly find users by their department (e.g., all Shopify employees).
 * - text index on name and email for efficient search functionality.
 * - OTP index to quickly find users during password reset flows.
 */

// Separate indexes for filters
UserSchema.index({ role: 1 });
UserSchema.index({ department: 1 });

// Text index for searchKey
UserSchema.index({
  name: "text",
  email: "text",
  phone: "text",
  employeeId: "text",
});

// Optional index to quickly find user by OTP during password reset
UserSchema.index({ otp: 1 });
