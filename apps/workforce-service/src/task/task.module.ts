import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Task, TaskSchema } from "../schemas/task.schema";
import { TaskController } from "./task.controller";
import { TaskService } from "./task.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    MongooseModule.forFeature(
      [{ name: Task.name, schema: TaskSchema }],
      "PRIMARY_DB",
    ),
    MongooseModule.forFeature(
      [{ name: Task.name, schema: TaskSchema }],
      "SECONDARY_DB",
    ),
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
