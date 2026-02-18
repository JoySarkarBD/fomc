/**
 * @fileoverview Global Mongoose connection module.
 *
 * Registers three connections against the same MongoDB URI:
 *
 * | Connection       | Read preference       | Use-case                          |
 * |------------------|-----------------------|-----------------------------------|
 * | *(default)*      | `primary`             | General-purpose read/write        |
 * | `PRIMARY_DB`     | `primary`             | Writes that must hit the primary  |
 * | `SECONDARY_DB`   | `secondaryPreferred`  | Read-heavy / reporting queries    |
 *
 * Import this module in any microservice root module that needs
 * database access.
 *
 * @module @shared/database
 */

import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import config from "../config/app.config";

/** Fallback URI used when the environment variable is unset. */
const MONGO_URI =
  config.MONGO_URI ?? "mongodb://127.0.0.1:27017/office-management";

@Module({
  imports: [
    /* Default connection — primary reads */
    MongooseModule.forRoot(MONGO_URI, {
      readPreference: "primary",
    }),

    /* Named connection for explicit primary writes */
    MongooseModule.forRoot(MONGO_URI, {
      connectionName: "PRIMARY_DB",
      readPreference: "primary",
    }),

    /* Named connection for read-heavy workloads */
    MongooseModule.forRoot(MONGO_URI, {
      connectionName: "SECONDARY_DB",
      readPreference: "secondaryPreferred",
    }),
  ],
  exports: [MongooseModule],
})
export class MongooseConnectionsModule {}
