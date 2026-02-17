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

  // Self invoking method to seed roles and permissions on application startup
  async onModuleInit() {
    await this.seedRolesAndPermissions();
  }

  async seedRolesAndPermissions() {
    // -----------------------
    // Seed Permissions
    // -----------------------
    const existingPermissions = await this.permissionModel.find().exec();
    let allPermissions: Permission[];

    if (existingPermissions.length > 0) {
      this.logger.warn(
        "Permissions already exist. Skipping permission seeding.",
      );
      allPermissions = existingPermissions;
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

      allPermissions = await this.permissionModel.insertMany(
        permissionsData.map((p) => ({ ...p, isSystem: true })),
      );

      this.logger.log(`Seeded ${allPermissions.length} system permissions.`);
    }

    // -----------------------
    // Seed Roles
    // -----------------------
    const existingRoles = await this.roleModel.find().exec();
    if (existingRoles.length > 0) {
      this.logger.warn("Roles already exist. Skipping role seeding.");
      return;
    }

    // Helper function: get permission ID by name
    const getPermissionId = (name: PermissionName) =>
      allPermissions.find((p) => p.name === name)?._id;

    const rolesData = [
      {
        name: "DIRECTOR",
        description: "Director role with all permissions",
        permissions: allPermissions.map((p) => p._id), // All permissions
        isSystem: true,
      },
      {
        name: "HR",
        description: "HR role with permissions to manage users and departments",
        permissions: [
          getPermissionId(PermissionName.USER),
          getPermissionId(PermissionName.DEPARTMENT),
          getPermissionId(PermissionName.ATTENDANCE),
          getPermissionId(PermissionName.LEAVE),
        ].filter(Boolean),
        isSystem: true,
      },
      {
        name: "PROJECT MANAGER",
        description:
          "Project Manager role with permissions to manage projects and teams",
        permissions: [
          getPermissionId(PermissionName.USER),
          getPermissionId(PermissionName.DESIGNATION),
          getPermissionId(PermissionName.ATTENDANCE),
          getPermissionId(PermissionName.LEAVE),
        ].filter(Boolean),
        isSystem: true,
      },
      {
        name: "TEAM LEADER",
        description:
          "Team Leader role with permissions to manage team members and tasks",
        permissions: [
          getPermissionId(PermissionName.USER),
          getPermissionId(PermissionName.ATTENDANCE),
          getPermissionId(PermissionName.LEAVE),
        ].filter(Boolean),
        isSystem: true,
      },
      {
        name: "EMPLOYEE",
        description: "Employee role with basic permissions",
        permissions: [
          getPermissionId(PermissionName.ATTENDANCE),
          getPermissionId(PermissionName.LEAVE),
        ].filter(Boolean),
        isSystem: true,
      },
      {
        name: "INTERN",
        description: "Intern role with limited permissions",
        permissions: [getPermissionId(PermissionName.ATTENDANCE)].filter(
          Boolean,
        ),
        isSystem: true,
      },
    ];

    const createdRoles = await this.roleModel.insertMany(rolesData);
    this.logger.log(`Seeded ${createdRoles.length} system roles.`);
  }
}
