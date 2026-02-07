import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

/**
 * Input type for creating a new user.
 * Includes fields for name and email.
 * @class CreateUserInput
 * @property {string} employeeId - Employee ID of the user (optional).
 * @property {string} name - Name of the user.
 * @property {string} email - Email address of the user.
 * @property {string} password - Password for the user.
 */
export class CreateUserDto {
  @IsString({ message: 'Employee ID must be a string' })
  @IsOptional()
  employeeId?: string;

  @IsDefined({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  @MaxLength(50, { message: 'Name must be at most 50 characters long' })
  name!: string;

  @IsString({ message: 'Phone number must be a string' })
  @IsOptional()
  phoneNumber?: string;

  @IsDefined({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email!: string;

  @IsDefined({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @MaxLength(100, { message: 'Password must be at most 100 characters long' })
  password!: string;
}
