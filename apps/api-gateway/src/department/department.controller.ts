/**
 * @fileoverview Department gateway controller.
 *
 * Exposes CRUD endpoints for department management and delegates
 * business logic to DepartmentService.
 *
 * @module api-gateway/department
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
} from "@nestjs/common";
import { MongoIdDto } from "@shared/dto/mongo-id.dto";
import { SearchQueryDto } from "@shared/dto/search-query.dto";
import { CreateDepartmentDto } from "../../../workforce-service/src/department/dto/create-department.dto";
import { UpdateDepartmentDto } from "../../../workforce-service/src/department/dto/update-department.dto";
import { DepartmentService } from "./department.service";

@Controller("department")
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  /**
   * Create a new department.
   *
   * @param {CreateDepartmentDto} data - The data transfer object containing the details of the department to be created.
   * @returns Promise resolving to the newly created department.
   */
  @Post()
  async createDepartment(@Body() createDepartmentDto: CreateDepartmentDto) {
    return await this.departmentService.createDepartment(createDepartmentDto);
  }

  /**
   * Retrieve all departments based on the provided search query parameters.
   *
   * @param {SearchQueryDto} query - The search query parameters for filtering and pagination.
   * @return Promise resolving to a list of departments matching the search criteria.
   */
  @Get()
  async findDepartments(@Query() query: SearchQueryDto) {
    return await this.departmentService.findDepartments(query);
  }

  /**
   * Retrieve a single department by ID.
   *
   * @param {string} id - The ID of the department to be retrieved.
   * @return Promise resolving to the department details.
   */
  @Get(":id")
  async findDepartmentById(@Param() params: MongoIdDto) {
    return await this.departmentService.findDepartmentById(params.id);
  }

  /**
   * Update an existing department by ID.
   *
   * @param {string} id - The ID of the department to be updated.
   * @param {UpdateDepartmentDto} updateDepartmentDto - The data transfer object containing the updated details of the department.
   * @return Promise resolving to the updated department details.
   */
  @Patch(":id")
  async updateDepartmentById(
    @Param() params: MongoIdDto,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return await this.departmentService.updateDepartmentById(
      params.id,
      updateDepartmentDto,
    );
  }

  /**
   * Delete a department by ID.
   *
   * @param {string} id - The ID of the department to be deleted.
   * @return Promise resolving to the result of the delete operation.
   */
  @Delete(":id")
  async deleteDepartmentById(@Param() params: MongoIdDto) {
    return await this.departmentService.deleteDepartmentById(params.id);
  }
}
