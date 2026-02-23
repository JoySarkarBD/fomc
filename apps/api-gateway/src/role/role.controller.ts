/**
 * @fileoverview Role gateway controller.
 *
 * Exposes CRUD endpoints for role management and delegates
 * business logic to RoleService.
 *
 * @module api-gateway/role
 */

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { MongoIdDto } from "@shared/dto/mongo-id.dto";
import { SearchQueryDto } from "@shared/dto/search-query.dto";
import { CreateRoleDto } from "apps/user-service/src/role/dto/create-role.dto";
import { UpdateRoleDto } from "apps/user-service/src/role/dto/update-role.dto";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RoleService } from "./role.service";

@ApiTags("Role")
@Controller("role")
@UseGuards(JwtAuthGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  /**
   * Create a new role.
   *
   * @param {CreateRoleDto} data - The data transfer object containing the details of the role to be created.
   * @returns Promise resolving to the newly created role.
   */
  @ApiOperation({
    summary: "Create role",
    description: "Creates a new user role in the system.",
  })
  @Post()
  async createRole(@Body() data: CreateRoleDto) {
    return await this.roleService.createRole(data);
  }

  /**
   * Retrieve all roles based on the provided search query parameters.
   *
   * @param {SearchQueryDto} query - The search query parameters for filtering and pagination.
   * @returns Promise resolving to a list of roles matching the search criteria.
   */
  @ApiOperation({
    summary: "List roles",
    description: "Retrieves a list of user roles with optional filtering.",
  })
  @Get()
  async findRoles(@Query() query: SearchQueryDto) {
    return await this.roleService.findRoles(query);
  }

  /**
   * Retrieve a single role by ID.
   *
   * @param {string} id - The ID of the role to be retrieved.
   * @return Promise resolving to the role details.
   */
  @ApiOperation({
    summary: "Get role by ID",
    description: "Retrieves details of a specific user role.",
  })
  @Get(":id")
  async findRoleById(@Param() params: MongoIdDto) {
    return await this.roleService.findRoleById(params.id);
  }

  /**
   * Update an existing role by ID.
   *
   * @param {UpdateRoleDto} data - The data transfer object containing the details of the role to be updated, including the role ID and the fields to be updated.
   * @return Promise resolving to the updated role details.
   */
  @ApiOperation({
    summary: "Update role",
    description: "Updates an existing user role's details.",
  })
  @Patch(":id")
  async updateRoleById(
    @Param() params: MongoIdDto,
    @Body() data: UpdateRoleDto,
  ) {
    return await this.roleService.updateRoleById(params.id, data);
  }

  /**
   * Delete a role by ID.
   *
   * @param {MongoIdDto} payload - Object containing the role ID to be deleted.
   * @return Promise resolving to the result of the delete operation.
   */
  @ApiOperation({
    summary: "Delete role",
    description: "Deletes a user role by its ID.",
  })
  @Delete(":id")
  async deleteRoleById(@Param() params: MongoIdDto) {
    return await this.roleService.deleteRoleById(params.id);
  }
}
