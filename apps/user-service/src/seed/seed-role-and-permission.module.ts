import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Permission, PermissionSchema } from "../schemas/permission.schema";
import { Role, RoleSchema } from "../schemas/role.schema";
import { SeedRollAndPermissionService } from "./seed-role-and-permission.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Role.name, schema: RoleSchema },
      { name: Permission.name, schema: PermissionSchema },
    ]),
  ],
  providers: [SeedRollAndPermissionService],
  exports: [SeedRollAndPermissionService],
})
export class SeedRollAndPermissionModule {}
