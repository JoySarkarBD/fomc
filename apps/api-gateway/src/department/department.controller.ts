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
import {
  DepartmentCreateConflictDto,
  DepartmentUpdateConflictDto,
} from "./dto/department-conflict.dto";
import {
  DepartmentDeleteForbiddenDto,
  DepartmentGetByIdForbiddenDto,
  DepartmentsForbiddenDto,
  DepartmentUpdateForbiddenDto,
} from "./dto/department-forbidden.dto";
import {
  DepartmentCreateInternalErrorDto,
  DepartmentDeleteInternalErrorDto,
  DepartmentInternalErrorDto,
  DepartmentUpdateInternalErrorDto,
} from "./dto/department-internal-error.dto";
import {
  DepartmentDeleteByIdNotFoundDto,
  DepartmentNotFoundDto,
  DepartmentUpdateByIdNotFoundDto,
} from "./dto/department-not-found.dto";
import {
  DepartmentByIdSuccessDto,
  DepartmentCreateSuccessDto,
  DepartmentDeleteSuccessDto,
  DepartmentPatchSuccessDto,
  DepartmentsListSuccessDto,
} from "./dto/department-success.dto";
import {
  DepartmentCreateUnauthorizedDto,
  DepartmentDeleteUnauthorizedDto,
  DepartmentGetByIdUnauthorizedDto,
  DepartmentsUnauthorizedDto,
  DepartmentUpdateUnauthorizedDto,
} from "./dto/department-unauthorized.dto";
import {
  DepartmentCreateValidationDto,
  DepartmentDeleteValidationDto,
  DepartmentGetByIdValidationDto,
  DepartmentsValidationDto,
  DepartmentUpdateValidationDto,
} from "./dto/department-validation.dto";

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
  @ApiStandardResponse(DepartmentCreateSuccessDto, {
    status: 201,
    successDto: DepartmentCreateSuccessDto,
    validationDto: DepartmentCreateValidationDto,
    unauthorizedDto: DepartmentCreateUnauthorizedDto,
    conflictDto: DepartmentCreateConflictDto,
    internalServerErrorDto: DepartmentCreateInternalErrorDto,
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
  @ApiStandardResponse(DepartmentsListSuccessDto, {
    status: 200,
    successDto: DepartmentsListSuccessDto,
    unauthorizedDto: DepartmentsUnauthorizedDto,
    forbiddenDto: DepartmentsForbiddenDto,
    internalServerErrorDto: DepartmentInternalErrorDto,
    validationDto: DepartmentsValidationDto,
    validation: true,
    isArray: true,
    unauthorized: true,
    forbidden: true,
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
  @ApiStandardResponse(DepartmentByIdSuccessDto, {
    status: 200,
    successDto: DepartmentByIdSuccessDto,
    validationDto: DepartmentGetByIdValidationDto,
    unauthorizedDto: DepartmentGetByIdUnauthorizedDto,
    forbiddenDto: DepartmentGetByIdForbiddenDto,
    notFoundDto: DepartmentNotFoundDto,
    internalServerErrorDto: DepartmentInternalErrorDto,
    validation: true,
    notFound: true,
    unauthorized: true,
    forbidden: true,
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
  @ApiStandardResponse(DepartmentPatchSuccessDto, {
    status: 200,
    successDto: DepartmentPatchSuccessDto,
    validationDto: DepartmentUpdateValidationDto,
    unauthorizedDto: DepartmentUpdateUnauthorizedDto,
    forbiddenDto: DepartmentUpdateForbiddenDto,
    notFoundDto: DepartmentUpdateByIdNotFoundDto,
    conflictDto: DepartmentUpdateConflictDto,
    internalServerErrorDto: DepartmentUpdateInternalErrorDto,
    validation: true,
    notFound: true,
    unauthorized: true,
    conflict: true,
    forbidden: true,
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
  @ApiStandardResponse(DepartmentDeleteSuccessDto, {
    status: 200,
    successDto: DepartmentDeleteSuccessDto,
    validationDto: DepartmentDeleteValidationDto,
    unauthorizedDto: DepartmentDeleteUnauthorizedDto,
    forbiddenDto: DepartmentDeleteForbiddenDto,
    notFoundDto: DepartmentDeleteByIdNotFoundDto,
    internalServerErrorDto: DepartmentDeleteInternalErrorDto,
    validation: true,
    notFound: true,
    unauthorized: true,
    forbidden: true,
    internalServerError: true,
  })
  @Delete(":id")
  async deleteDepartmentById(@Param() params: MongoIdDto) {
    return await this.departmentService.deleteDepartmentById(params.id);
  }
}
