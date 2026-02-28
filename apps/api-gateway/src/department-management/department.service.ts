/**
 * @fileoverview Department gateway service.
 *
 * Sends TCP commands to the Workforce micro-service (which owns
 * departments) and normalises the response for the API layer.
 */

import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateDepartmentDto } from "../../../workforce-service/src/department-management/dto/create-department.dto";

import { ClientProxy } from "@nestjs/microservices";
import { DEPARTMENT_COMMANDS } from "@shared/constants/department-command.constants";
import { MongoIdDto } from "@shared/dto/mongo-id.dto";
import { SearchQueryDto } from "@shared/dto/search-query.dto";
import { handleException } from "@shared/utils/handle.exception";
import { firstValueFrom } from "rxjs";
import { UpdateDepartmentDto } from "../../../workforce-service/src/department-management/dto/update-department.dto";
import { buildResponse } from "../common/response.util";

@Injectable()
export class DepartmentService {
  constructor(
    @Inject("WORKFORCE_SERVICE") private readonly workforceClient: ClientProxy,
  ) {}

  /**
   * Create a new department.
   *
   * @param {CreateDepartmentDto} data - The data transfer object containing the details of the department to be created.
   * @return Promise resolving to the newly created department.
   */
  async create(data: CreateDepartmentDto) {
    const result = await firstValueFrom(
      this.workforceClient.send(DEPARTMENT_COMMANDS.CREATE_DEPARTMENT, data),
    );
    handleException(result);
    return buildResponse("Department created successfully", result);
  }

  /**
   * Find all departments.
   *
   * @param {SearchQueryDto} query - The search query parameters.
   * @returns Promise resolving to a list of departments matching the search criteria.
   */
  async findAll(query: SearchQueryDto) {
    const result = await firstValueFrom(
      this.workforceClient.send(DEPARTMENT_COMMANDS.GET_DEPARTMENTS, query),
    );
    return buildResponse("Departments fetched successfully", result);
  }

  /**
   * Find a department by ID.
   *
   * @param {string} id - The ID of the department to be retrieved.
   * @return Promise resolving to the department details.
   */
  async findOne(id: MongoIdDto["id"]) {
    const result = await firstValueFrom(
      this.workforceClient.send(DEPARTMENT_COMMANDS.GET_DEPARTMENT, id),
    );
    if (!result) {
      throw new NotFoundException("Department not found");
    }
    return buildResponse("Department fetched successfully", result);
  }

  /**
   * Update a department by ID.
   *
   * @param {string} id - The ID of the department to be updated.
   * @param {UpdateDepartmentDto} updateDepartmentDto - The data transfer object containing the updated details of the department.
   * @return Promise resolving to the updated department details.
   */
  async update(id: MongoIdDto["id"], data: UpdateDepartmentDto) {
    const result = await firstValueFrom(
      this.workforceClient.send(DEPARTMENT_COMMANDS.UPDATE_DEPARTMENT, {
        id,
        data,
      }),
    );

    handleException(result);

    return buildResponse("Department updated successfully", result);
  }

  /**
   * Delete a department by ID.
   *
   * @param {string} id - The ID of the department to be deleted.
   * @return Promise resolving to the result of the delete operation.
   */
  async remove(id: MongoIdDto["id"]) {
    const result = await firstValueFrom(
      this.workforceClient.send(DEPARTMENT_COMMANDS.DELETE_DEPARTMENT, id),
    );

    handleException(result);

    return buildResponse("Department deleted successfully", result);
  }
}
