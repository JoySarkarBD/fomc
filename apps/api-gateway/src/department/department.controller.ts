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
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { MongoIdDto } from "@shared/dto/mongo-id.dto";
import { SearchQueryDto } from "@shared/dto/search-query.dto";
import { CreateDepartmentDto } from "../../../workforce-service/src/department/dto/create-department.dto";
import { UpdateDepartmentDto } from "../../../workforce-service/src/department/dto/update-department.dto";
import { ApiStandardResponse } from "../common/decorators/api-standard-response";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { DepartmentService } from "./department.service";
import { CreateDepartmentConflictDto } from "./dto/create-department-conflict.dto";
import { CreateDepartmentInternalErrorDto } from "./dto/create-department-internal-error.dto";
import { CreateDepartmentUnauthorizedDto } from "./dto/create-department-unauthorized.dto";
import { CreateDepartmentValidationDto } from "./dto/create-department-validation.dto";
import { DepartmentListSuccessDto } from "./dto/department-list-success.dto";
import { DepartmentSuccessDto } from "./dto/department-success.dto";

@ApiTags("Department")
@Controller("department")
@UseGuards(JwtAuthGuard)
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  /**
   * Create a new department.
   *
   * @param {CreateDepartmentDto} data - The data transfer object containing the details of the department to be created.
   * @returns Promise resolving to the newly created department.
   */
  @ApiOperation({
    summary: "Create department",
    description: "Creates a new department in the organization.",
  })
  @ApiStandardResponse(DepartmentSuccessDto, {
    status: 201,
    successDto: DepartmentSuccessDto,
    validationDto: CreateDepartmentValidationDto,
    unauthorizedDto: CreateDepartmentUnauthorizedDto,
    conflictDto: CreateDepartmentConflictDto,
    internalServerErrorDto: CreateDepartmentInternalErrorDto,
    unauthorized: true,
    conflict: true,
    internalServerError: true,
  })
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
  @ApiOperation({
    summary: "List departments",
    description: "Retrieves a list of departments with optional filtering.",
  })
  @ApiStandardResponse(DepartmentListSuccessDto, {
    status: 200,
    successDto: DepartmentListSuccessDto,
    isArray: true,
    unauthorized: true,
    internalServerError: true,
  })
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
  @ApiOperation({
    summary: "Get department by ID",
    description: "Retrieves details of a specific department.",
  })
  @ApiStandardResponse(DepartmentSuccessDto, {
    status: 200,
    successDto: DepartmentSuccessDto,
    notFound: true,
    unauthorized: true,
    internalServerError: true,
  })
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
  @ApiOperation({
    summary: "Update department",
    description: "Updates an existing department's details.",
  })
  @ApiStandardResponse(DepartmentSuccessDto, {
    status: 200,
    successDto: DepartmentSuccessDto,
    notFound: true,
    forbidden: true,
    conflict: true,
    unauthorized: true,
    internalServerError: true,
  })
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
  @ApiOperation({
    summary: "Delete department",
    description: "Deletes a department by its ID.",
  })
  @ApiStandardResponse(DepartmentSuccessDto, {
    status: 200,
    successDto: DepartmentSuccessDto,
    notFound: true,
    forbidden: true,
    conflict: true,
    unauthorized: true,
    internalServerError: true,
  })
  @Delete(":id")
  async deleteDepartmentById(@Param() params: MongoIdDto) {
    return await this.departmentService.deleteDepartmentById(params.id);
  }
}
