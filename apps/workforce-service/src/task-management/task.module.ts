/**
 * @fileoverview Task Module
 *
 * Configures the Task feature module within the Workforce microservice.
 * Registers Mongoose schemas for Task across default, PRIMARY_DB, and
 * SECONDARY_DB connections.
 */
import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { MongooseModule } from "@nestjs/mongoose";
import config from "@shared/config/app.config";
import {
  Client,
  ClientSchema,
  Profile,
  ProfileSchema,
  Project,
  ProjectSchema,
} from "../schemas/project.schema";
import { Task, TaskSchema } from "../schemas/task.schema";
import { TaskController } from "./task.controller";
import { TaskService } from "./task.service";

@Module({
  imports: [
    /**
     * Mongoose Module configured with the Task schema, defining the structure of task documents in the MongoDB database.
     * This allows the Task Service to perform CRUD operations on task data, ensuring that task documents adhere to the defined schema and enabling efficient data management and retrieval.
     */
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchema },
      { name: Client.name, schema: ClientSchema },
      { name: Project.name, schema: ProjectSchema },
      { name: Profile.name, schema: ProfileSchema}
    ]),

    /**
     * Clients Module configured to register a microservice client for the User Service and Notification Service, enabling communication between the Workforce Service and these services over TCP.
     * This allows the Task Service to interact with the User Service and Notification Service microservices, facilitating operations such as retrieving user information and sending notifications related to task management activities, while maintaining a decoupled architecture and promoting scalability within the API Gateway.
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
      {
        name: "NOTIFICATION_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: [config.RABBITMQ_URL],
          queue: config.NOTIFICATION_QUEUE,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],

  /**
   * Controllers for the Task Module, responsible for handling incoming requests related to task operations and returning appropriate responses.
   * The TaskController defines the routes and endpoints for task-related operations, allowing clients to interact with the Workforce Service to manage tasks effectively.
   */
  controllers: [TaskController],

  /**
   * Providers for the Task Module, responsible for implementing the business logic and data access for task-related operations.
   * The TaskService contains methods for creating, retrieving, updating, and deleting tasks, as well as any additional logic required to manage task data effectively within the Workforce Service.
   */
  providers: [TaskService],
})
export class TaskModule {}
