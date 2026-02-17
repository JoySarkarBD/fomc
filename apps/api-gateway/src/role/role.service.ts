import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { UpdateRoleDto } from "apps/user-service/src/role/dto/update-role.dto";
import { ROLE_COMMANDS } from "../../../user-service/src/constants/role.constants";
import { CreateRoleDto } from "../../../user-service/src/role/dto/create-role.dto";
import { MongoIdDto } from "../common/dto/mongo-id.dto";
import { SearchQueryDto } from "../common/dto/search-query.dto";

/**
 * Role Service
 *
 * Handles communication with the Role microservice via ClientProxy.
 * Provides methods for CRUD operations on roles.
 */
@Injectable()
export class RoleService {
  constructor(
    @Inject("USER_SERVICE") private readonly roleClient: ClientProxy,
  ) {}

  /**
   * Create a new role.
   *
   * @param {CreateRoleDto} data - The data transfer object containing the details of the role to be created.
   * @returns Promise resolving to the newly created role.
   */
  async createRole(data: CreateRoleDto) {
    return await this.roleClient.send(ROLE_COMMANDS.CREATE_ROLE, data);
  }

  /**
   * Retrieve all roles based on the provided search query parameters.
   *
   * @param {SearchQueryDto} query - The search query parameters for filtering and pagination.
   * @returns Promise resolving to a list of roles matching the search criteria.
   */
  async findRoles(query: SearchQueryDto) {
    const result = await this.roleClient.send(ROLE_COMMANDS.GET_ROLES, query);
    return result;
  }

  /**
   * Retrieve a single role by ID.
   *
   * @param {string} id - The ID of the role to be retrieved.
   * @returns Promise resolving to the role details.
   */
  async findRoleById(id: string) {
    return await this.roleClient.send(ROLE_COMMANDS.GET_ROLE, id);
  }

  /**
   * Update an existing role by ID.
   *
   * @param {UpdateRoleDto} data - The data transfer object containing the details of the role to be updated, including the role ID and the fields to be updated.
   * @returns Promise resolving to the updated role details.
   */
  async updateRoleById(id: MongoIdDto["id"], data: UpdateRoleDto) {
    return await this.roleClient.send(ROLE_COMMANDS.UPDATE_ROLE, {
      id,
      data,
    });
  }

  /**
   * Delete a role by ID.
   *
   * @param {string} id - The ID of the role to be deleted.
   * @returns Promise resolving to the result of the delete operation.
   */
  async deleteRoleById(id: MongoIdDto["id"]) {
    return await this.roleClient.send(ROLE_COMMANDS.DELETE_ROLE, id);
  }
}
