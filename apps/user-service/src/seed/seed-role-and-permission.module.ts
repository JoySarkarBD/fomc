/** @fileoverview Seed module for roles and permissions. Registers the seeding service that runs on module init. @module user-service/seed/seed-role-and-permission.module */
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Permission, PermissionSchema } from "../schemas/permission.schema";
import { Role, RoleSchema } from "../schemas/role.schema";
import { SeedRoleAndPermissionService } from "./seed-role-and-permission.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Role.name, schema: RoleSchema },
      { name: Permission.name, schema: PermissionSchema },
    ]),
  ],
  providers: [SeedRoleAndPermissionService],
  exports: [SeedRoleAndPermissionService],
})
export class SeedRoleAndPermissionModule {}
