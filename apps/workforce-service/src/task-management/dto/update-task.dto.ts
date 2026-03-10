/**
 * @fileoverview Update Task DTO
 *
 * Defines the validation schema for updating an existing task.
 * Extends CreateTaskDto with all fields made optional via PartialType,
 * and adds a required MongoDB ObjectId for identifying the task.
 */
import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { DcrSubmissionStatus, TaskStatus } from "../../schemas/task.schema";
import { CreateTaskDto } from "./create-task.dto";

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}

export class UpdateTaskStatusDto {
  @ApiProperty({
    required: true,
    description: `The new status - ${Object.values(TaskStatus).join(", ")}`,
    example: TaskStatus.WIP,
  })
  @IsOptional()
  @IsEnum(TaskStatus, {
    message: `Invalid task status - ${Object.values(TaskStatus).join(", ")}`,
  })
  status?: TaskStatus;
}

export class UpdateDcrSubmissionStatusDto {
  @ApiProperty({
    required: true,
    description: `The new DCR submission status - ${Object.values(DcrSubmissionStatus).join(", ")}`,
    example: DcrSubmissionStatus.SUBMITTED,
  })
  @IsEnum(DcrSubmissionStatus, {
    message: `Invalid DCR submission status - ${Object.values(DcrSubmissionStatus).join(", ")}`,
  })
  status!: DcrSubmissionStatus;
}

export class ReplyOnDcrReviewDto {
  @ApiProperty({
    required: true,
    description: "The review comment to add to the DCR submission",
    example: "Please provide more details on the issue.",
  })
  @IsString({ message: "Comment must be a string" })
  comment!: string;
}
