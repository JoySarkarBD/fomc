import { Module } from "@nestjs/common";
import { MongooseConnectionsModule } from "../../common/src/mongoose/mongoose-connections.module";
import { AttendanceModule } from "./attendance/attendance.module";
import { TaskModule } from "./task/task.module";

@Module({
  imports: [MongooseConnectionsModule, AttendanceModule, TaskModule],
})
export class WorkforceModule {}
