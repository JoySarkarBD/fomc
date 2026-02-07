import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document; // Mongoose Document type

// Enums for user roles and departments
export enum UserRole {
  DIRECTOR = 'DIRECTOR',
  HR = 'HR',
  PROJECT_MANAGER = 'PROJECT_MANAGER',
  TEAM_LEADER = 'TEAM_LEADER',
  EMPLOYEE = 'EMPLOYEE',
}

// Enums for user departments
export enum Department {
  SHOPIFY = 'SHOPIFY',
  WORDPRESS = 'WORDPRESS',
  CUSTOM = 'CUSTOM',
}

@Schema({ timestamps: true, versionKey: false }) // Automatically add createdAt and updatedAt fields, disable __v version key
export class User extends Document {
  @Prop({ required: true })
  name!: string; // Name of the user

  @Prop({ default: null })
  employeeId?: string;

  @Prop({ required: true })
  phoneNumber?: string; // Name of the user

  @Prop({ required: true, unique: true })
  email!: string; // Email address of the user

  @Prop({ default: null })
  secondaryEmail?: string; // Secondary email address (optional)

  @Prop({ required: true, select: false })
  password?: string; // Password for the user (should be hashed in production)

  @Prop({ default: UserRole.EMPLOYEE, enum: UserRole })
  role: UserRole = UserRole.EMPLOYEE; // Default role for the user

  @Prop({ default: null, enum: Department })
  department?: Department; // Department of the user (optional)
}

export const UserSchema = SchemaFactory.createForClass(User);

// Indexes for efficient querying
UserSchema.index({ employeeId: 1, email: 1, phoneNumber: 1, department: 1 });
