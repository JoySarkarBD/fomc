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
