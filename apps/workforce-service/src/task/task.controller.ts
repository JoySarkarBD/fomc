import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { TASK_COMMAND_NAMES } from "./constants/task.constants";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { TaskService } from "./task.service";

@Controller()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @MessagePattern(TASK_COMMAND_NAMES.CREATE_TASK)
  create(@Payload() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @MessagePattern(TASK_COMMAND_NAMES.GET_TASKS)
  findAll() {
    return this.taskService.findAll();
  }

  @MessagePattern(TASK_COMMAND_NAMES.GET_TASK)
  findOne(@Payload() id: number) {
    return this.taskService.findOne(id);
  }

  @MessagePattern(TASK_COMMAND_NAMES.UPDATE_TASK)
  update(@Payload() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(updateTaskDto.id, updateTaskDto);
  }

  @MessagePattern(TASK_COMMAND_NAMES.DELETE_TASK)
  remove(@Payload() id: number) {
    return this.taskService.remove(id);
  }
}
