import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserParamDto } from "./dto/user-param.dto";
import { UserService } from "./user.service";

/**
 * UserController
 *
 * Handles all user-related API endpoints.
 * Supports CRUD operations for users.
 */
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Get all users.
   *
   * @returns Array of users
   */
  @Get()
  async getUsers(): Promise<any> {
    return await this.userService.getUsers();
  }

  /**
   * Get a single user by ID.
   *
   * @param params - Object containing the user ID
   * @returns User object
   */
  @Get(":id")
  async getUser(@Param() params: UserParamDto): Promise<any> {
    return await this.userService.getUser(params.id);
  }

  /**
   * Create a new user.
   *
   * @param data - DTO containing user creation data
   * @returns Created user object
   */
  @Post("")
  async createUser(@Body() data: CreateUserDto): Promise<any> {
    return await this.userService.createUser(data);
  }

  /**
   * Update an existing user by ID.
   *
   * @param params - Object containing the user ID
   * @param data - DTO containing updated user data
   * @returns Updated user object
   */
  @Put(":id")
  async updateUser(
    @Param() params: UserParamDto,
    @Body() data: UpdateUserDto,
  ): Promise<any> {
    return await this.userService.updateUser(params.id, data);
  }

  /**
   * Delete a user by ID.
   *
   * @param params - Object containing the user ID
   * @returns Deleted user object
   */
  @Delete(":id")
  async deleteUser(@Param() params: UserParamDto): Promise<any> {
    return await this.userService.deleteUser(params.id);
  }
}
