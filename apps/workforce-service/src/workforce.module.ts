import { Module } from "@nestjs/common";
import { MongooseConnectionsModule } from "../../common/src/mongoose/mongoose-connections.module";
import { TaskModule } from "./task/task.module";

@Module({
  imports: [MongooseConnectionsModule, TaskModule],

  /**
   * Controllers responsible for handling incoming microservice messages related to user operations, such as creating, retrieving, updating, and deleting users.
   * The UserController defines the message patterns and handling logic for these operations, utilizing the UserService to perform the necessary business logic.
   */
  controllers: [],

  /**
   * Providers containing business logic for user-related operations.
   * The UserService encapsulates the core functionality for managing users,
   * including creating, retrieving, updating, and deleting user records.
   */
  providers: [],
})
export class WorkforceModule {}
