import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { CreateRoleDto } from "apps/user-service/src/role/dto/create-role.dto";
import { UpdateRoleDto } from "apps/user-service/src/role/dto/update-role.dto";
import { MongoIdDto } from "../common/dto/mongo-id.dto";
import { SearchQueryDto } from "../common/dto/search-query.dto";
import { RoleService } from "./role.service";

/**
 * User Controller
 *
 * Handles HTTP requests related to role management, including creating, retrieving, updating, and deleting roles. It uses the RoleService to perform business logic and interact with the Role microservice via ClientProxy.
 * Includes guards and validation to ensure that incoming requests contain valid data and that only authorized users can perform certain actions.
 */
@Controller("role")
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  /**
   * Create a new role.
   *
   * @param {CreateRoleDto} data - The data transfer object containing the details of the role to be created.
   * @returns Promise resolving to the newly created role.
   */
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
  @Delete(":id")
  async deleteRoleById(@Param() params: MongoIdDto) {
    return await this.roleService.deleteRoleById(params.id);
  }
}
