/**
 * @fileoverview Designation gateway controller.
 *
 * Exposes CRUD endpoints for designation management and delegates
 * business logic to DesignationService.
 *
 * @module api-gateway/designation
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
import { CreateDesignationDto } from "apps/workforce-service/src/designation/dto/create-designation.dto";
import { UpdateDesignationDto } from "apps/workforce-service/src/designation/dto/update-designation.dto";
import { ApiStandardResponse } from "../common/decorators/api-standard-response";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { DesignationService } from "./designation.service";
import { DesignationListSuccessDto } from "./dto/designation-list-success.dto";
import { DesignationSuccessDto } from "./dto/designation-success.dto";

@ApiTags("Designation")
@Controller("designation")
@UseGuards(JwtAuthGuard)
export class DesignationController {
  constructor(private readonly designationService: DesignationService) {}

  /**
   * Create a new designation.
   *
   * @param {CreateDesignationDto} createDesignationDto - The data transfer object containing the details of the designation to be created.
   * @returns Promise resolving to the newly created designation.
   */
  @ApiOperation({
    summary: "Create designation",
    description: "Creates a new job designation in the organization.",
  })
  @ApiStandardResponse(DesignationSuccessDto, {
    status: 201,
    successDto: DesignationSuccessDto,
    conflict: true,
    unauthorized: true,
    internalServerError: true,
  })
  @Post()
  async createDesignation(@Body() createDesignationDto: CreateDesignationDto) {
    return await this.designationService.createDesignation(
      createDesignationDto,
    );
  }

  /**
   * Retrieve all designations based on the provided search query parameters.
   *
   * @param {SearchQueryDto} query - The search query parameters for filtering and pagination.
   * @return Promise resolving to a list of designations matching the search criteria.
   */
  @ApiOperation({
    summary: "List designations",
    description:
      "Retrieves a list of job designations with optional filtering.",
  })
  @ApiStandardResponse(DesignationListSuccessDto, {
    status: 200,
    successDto: DesignationListSuccessDto,
    isArray: true,
    unauthorized: true,
    internalServerError: true,
  })
  @Get()
  async findDesignations(@Query() query: SearchQueryDto) {
    return await this.designationService.findDesignations(query);
  }

  /**
   * Retrieve a single designation by ID.
   *
   * @param {string} id - The ID of the designation to be retrieved.
   * @return Promise resolving to the designation details.
   */
  @ApiOperation({
    summary: "Get designation by ID",
    description: "Retrieves details of a specific job designation.",
  })
  @ApiStandardResponse(DesignationSuccessDto, {
    status: 200,
    successDto: DesignationSuccessDto,
    notFound: true,
    unauthorized: true,
    internalServerError: true,
  })
  @Get(":id")
  async findDepartmentById(@Param() params: MongoIdDto) {
    return await this.designationService.findDesignationById(params.id);
  }

  /**
   * Update an existing designation by ID.
   *
   * @param {string} id - The ID of the designation to be updated.
   * @param {UpdateDesignationDto} updateDesignationDto - The data transfer object containing the updated details of the designation.
   * @return Promise resolving to the updated designation details.
   */
  @ApiOperation({
    summary: "Update designation",
    description: "Updates an existing job designation's details.",
  })
  @ApiStandardResponse(DesignationSuccessDto, {
    status: 200,
    successDto: DesignationSuccessDto,
    notFound: true,
    conflict: true,
    unauthorized: true,
    internalServerError: true,
  })
  @Patch(":id")
  async updateDesignationById(
    @Param() params: MongoIdDto,
    @Body() updateDesignationDto: UpdateDesignationDto,
  ) {
    return await this.designationService.updateDesignationById(
      params.id,
      updateDesignationDto,
    );
  }

  /**
   * Retrieve multiple designations by their IDs.
   *
   * @param {string[]} ids - An array of designation IDs to be retrieved.
   * @return Promise resolving to a list of designations matching the provided IDs.
   */
  @ApiOperation({
    summary: "Batch get designations",
    description: "Retrieves multiple designations by their IDs.",
  })
  @ApiStandardResponse(DesignationListSuccessDto, {
    status: 200,
    successDto: DesignationListSuccessDto,
    isArray: true,
    unauthorized: true,
    internalServerError: true,
  })
  @Get("batch")
  async findDesignationsByIds(@Query("ids") ids: string | string[]) {
    const idsArray = Array.isArray(ids) ? ids : [ids];
    return await this.designationService.findDesignationsByIds(idsArray);
  }

  /**
   * Delete a designation by ID.
   *
   * @param {string} id - The ID of the designation to be deleted.
   * @return Promise resolving to a message indicating the result of the delete operation.
   */
  @ApiOperation({
    summary: "Delete designation",
    description: "Deletes a job designation by its ID.",
  })
  @ApiStandardResponse(DesignationSuccessDto, {
    status: 200,
    successDto: DesignationSuccessDto,
    notFound: true,
    unauthorized: true,
    internalServerError: true,
  })
  @Delete(":id")
  async deleteDesignationById(@Param() params: MongoIdDto) {
    return await this.designationService.deleteDesignationById(params.id);
  }
}
