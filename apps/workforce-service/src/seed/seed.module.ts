import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Department, DepartmentSchema } from "../schemas/department.schema";
import { SeedRolesAndPermissionService } from "./seed.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Department.name, schema: DepartmentSchema },
    ]),
  ],
  providers: [SeedRolesAndPermissionService],
  exports: [SeedRolesAndPermissionService],
})
export class SeedRolesAndPermissionModule {}
