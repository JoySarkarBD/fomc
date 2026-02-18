/**
 * @fileoverview Seed Department & Designation Module
 *
 * Registers Mongoose schemas and the seed service that populates default
 * departments (HR, Sales, Operations) and their associated designations
 * on module initialization.
 */
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Department, DepartmentSchema } from "../schemas/department.schema";
import { Designation, DesignationSchema } from "../schemas/designation.schema";
import { SeedDepartmentAndDesignationService } from "./seed-department-and-designation.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Department.name, schema: DepartmentSchema },
      { name: Designation.name, schema: DesignationSchema },
    ]),
  ],
  providers: [SeedDepartmentAndDesignationService],
  exports: [SeedDepartmentAndDesignationService],
})
export class SeedDepartmentAndDesignationModule {}
