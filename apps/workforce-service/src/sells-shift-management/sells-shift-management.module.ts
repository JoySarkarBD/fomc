/**
 * @fileoverview Sells Shift Management Module
 *
 * This module encapsulates the functionality related to managing sells shift management records in the Workforce service. It includes the controller and service responsible for handling operations such as creating new sells shift management records for users and retrieving existing records based on user ID.
 */

import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { MongooseModule } from "@nestjs/mongoose";
import config from "@shared/config/app.config";
import { MongooseConnectionsModule } from "@shared/database/mongoose-connections.module";
import {
  SalesShiftAssignment,
  SalesShiftAssignmentSchema,
} from "../schemas/sales-shift-assignment.schema";
import { SellsShiftManagementController } from "./sells-shift-management.controller";
import { SellsShiftManagementService } from "./sells-shift-management.service";

@Module({
  imports: [
    /**
     * Mongoose Module configured to connect to the MongoDB database using the connection string provided in the environment variables.
     * This allows the Role Service to interact with the MongoDB database for storing and retrieving role data, enabling persistence and data management for role-related operations.
     */
    MongooseConnectionsModule,

    /**
     * Mongoose Module configured with the Sales shift management schema, defining the structure of department documents in the MongoDB database.
     * This allows the Sells Shift Management Service to perform CRUD operations on the data, ensuring that department documents adhere to the defined schema and enabling efficient data management and retrieval.
     */
    MongooseModule.forFeature([
      {
        name: SalesShiftAssignment.name,
        schema: SalesShiftAssignmentSchema,
      },
    ]),

    /**
     * Clients Module configured to register a microservice client for the Role Service, enabling communication between the API Gateway and the Role Service over TCP.
     * This allows the RoleController and RoleService to interact with the Role Service for operations such as retrieving role information, managing role data, and other role-related functionalities, facilitating a microservices architecture where different services can communicate seamlessly.
     */
    ClientsModule.register([
      {
        name: "USER_SERVICE",
        transport: Transport.TCP,
        options: {
          host: config.USER_SERVICE_HOST ?? "127.0.0.1",
          port: Number(config.USER_SERVICE_PORT ?? 3001),
        },
      },
    ]),
  ],

  controllers: [SellsShiftManagementController],
  providers: [SellsShiftManagementService],
})
export class SellsShiftManagementModule {}
