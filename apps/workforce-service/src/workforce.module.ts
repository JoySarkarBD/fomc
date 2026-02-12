import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import config from "../../config/config";

@Module({
  imports: [
    MongooseModule.forRoot(
      config.MONGO_URI
        ? config.MONGO_URI
        : "mongodb://127.0.0.1:27017/office-management",
    ),
    MongooseModule.forFeature([]),
  ],

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
