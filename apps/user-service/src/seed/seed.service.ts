import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Permission, PermissionName } from "../schemas/permission.schema";
import { Role } from "../schemas/role.schema";

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectModel(Role.name) private roleModel: Model<Role>,
    @InjectModel(Permission.name) private permissionModel: Model<Permission>,
  ) {}

  async seedRolesAndPermissions() {
    // -----------------------
    // Seed Permissions
    // -----------------------
    const existingPermissions = await this.permissionModel.find().exec();

    if (existingPermissions.length > 0) {
      this.logger.warn(
        "Permissions already exist. Skipping permission seeding.",
      );
    } else {
      const permissionsData = [
        {
          name: PermissionName.USER,
          description: "Permission to manage users",
          canCreate: true,
          canRead: true,
          canUpdate: true,
          canDelete: true,
        },
        {
          name: PermissionName.DEPARTMENT,
          description: "Permission to manage departments",
          canCreate: true,
          canRead: true,
          canUpdate: true,
          canDelete: true,
        },
        {
          name: PermissionName.ROLE,
          description: "Permission to manage roles",
          canCreate: true,
          canRead: true,
          canUpdate: true,
          canDelete: true,
        },
        {
          name: PermissionName.DESIGNATION,
          description: "Permission to manage designations",
          canCreate: true,
          canRead: true,
          canUpdate: true,
          canDelete: true,
        },
        {
          name: PermissionName.PERMISSION,
          description: "Permission to manage permissions",
          canCreate: true,
          canRead: true,
          canUpdate: true,
          canDelete: true,
        },
        {
          name: PermissionName.ATTENDANCE,
          description: "Permission to manage attendance",
          canCreate: true,
          canRead: true,
          canUpdate: true,
          canDelete: true,
        },
        {
          name: PermissionName.LEAVE,
          description: "Permission to manage leave",
          canCreate: true,
          canRead: true,
          canUpdate: true,
          canDelete: true,
        },
      ];

      const createdPermissions = await this.permissionModel.insertMany(
        permissionsData.map((p) => ({ ...p, isSystem: true })),
      );

      this.logger.log(
        `Seeded ${createdPermissions.length} system permissions.`,
      );
    }

    // -----------------------
    // Seed Roles
    // -----------------------
    const existingRoles = await this.roleModel.find().exec();
    if (existingRoles.length > 0) {
      this.logger.warn("Roles already exist. Skipping role seeding.");
      return;
    }

    // Fetch permission IDs to assign to roles
    const allPermissions = await this.permissionModel.find().exec();
    const permissionIds = allPermissions.map((p) => p._id);

    const rolesData = [
      {
        name: "DIRECTOR",
        description: "Director role with all permissions",
        permissions: permissionIds, // all permissions
        isSystem: true,
      },
      {
        name: "HR",
        description: "HR role with permissions to manage users and departments",
        permissions: permissionIds.filter(
          (p, i) => [0, 1, 5, 6].includes(i), // USER, DEPARTMENT, ATTENDANCE, LEAVE
        ),
        isSystem: true,
      },
      {
        name: "PROJECT MANAGER",
        description:
          "Project Manager role with permissions to manage projects and teams",
        permissions: permissionIds.filter(
          (p, i) => [0, 3, 5, 6].includes(i), // USER, DESIGNATION, ATTENDANCE, LEAVE
        ),
        isSystem: true,
      },
      {
        name: "TEAM LEADER",
        description:
          "Team Leader role with permissions to manage team members and tasks",
        permissions: permissionIds.filter(
          (p, i) => [0, 5, 6].includes(i), // USER, ATTENDANCE, LEAVE
        ),
        isSystem: true,
      },
      {
        name: "EMPLOYEE",
        description: "Employee role with basic permissions",
        permissions: permissionIds.filter(
          (p, i) => [5, 6].includes(i), // ATTENDANCE, LEAVE
        ),
        isSystem: true,
      },
      {
        name: "INTERN",
        description: "Intern role with limited permissions",
        permissions: permissionIds.filter((p, i) => [5].includes(i)), // ATTENDANCE only
        isSystem: true,
      },
    ];

    const createdRoles = await this.roleModel.insertMany(
      rolesData.map((r) => ({ ...r, isSystem: true })),
    );

    this.logger.log(`Seeded ${createdRoles.length} system roles.`);
  }
}
