/**
 * @fileoverview Task Controller
 *
 * Handles all task-related microservice message patterns in the
 * Workforce service. Supports CRUD operations on tasks via TCP transport.
 */
import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { TASK_COMMANDS } from "@shared/constants/task-command.constants";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { TaskService } from "./task.service";

@Controller()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @MessagePattern(TASK_COMMANDS.CREATE_TASK)
  async create(@Payload() createTaskDto: CreateTaskDto): Promise<any> {
    return await this.taskService.create(createTaskDto);
  }

  @MessagePattern(TASK_COMMANDS.GET_TASKS)
  async findAll(): Promise<any> {
    return await this.taskService.findAll();
  }

  @MessagePattern(TASK_COMMANDS.GET_TASK)
  async findOne(@Payload() id: number): Promise<any> {
    return await this.taskService.findOne(id);
  }

  @MessagePattern(TASK_COMMANDS.UPDATE_TASK)
  async update(@Payload() updateTaskDto: UpdateTaskDto): Promise<any> {
    return await this.taskService.update(updateTaskDto.id, updateTaskDto);
  }

  @MessagePattern(TASK_COMMANDS.DELETE_TASK)
  async remove(@Payload() id: number): Promise<any> {
    return await this.taskService.remove(id);
  }
}
