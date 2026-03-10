import { ApiProperty } from "@nestjs/swagger";
import { CustomNotFoundDto } from "apps/api-gateway/src/common/dto/custom-not-found.dto";
import { Methods } from "apps/api-gateway/src/common/enum/methods.enum";

export class TaskByIdNotFoundDto extends CustomNotFoundDto {
  @ApiProperty({ example: "Task not found" })
  declare message: string;

  @ApiProperty({ example: Methods.GET })
  declare method: Methods.GET;

  @ApiProperty({ example: "api/task/:id" })
  declare endpoint: string;

  @ApiProperty({ example: "Task not found" })
  declare error: string;
}

export class TaskUpdateNotFoundDto extends CustomNotFoundDto {
  @ApiProperty({ example: "Task not found" })
  declare message: string;

  @ApiProperty({ example: Methods.PATCH })
  declare method: Methods.PATCH;

  @ApiProperty({ example: "api/task/:id" })
  declare endpoint: string;

  @ApiProperty({ example: "Task not found" })
  declare error: string;
}

export class TaskStatusUpdateNotFoundDto extends CustomNotFoundDto {
  @ApiProperty({ example: "Task not found" })
  declare message: string;

  @ApiProperty({ example: Methods.PATCH })
  declare method: Methods.PATCH;

  @ApiProperty({ example: "api/task/:id/status" })
  declare endpoint: string;

  @ApiProperty({ example: "Task not found" })
  declare error: string;
}

export class TaskDeleteNotFoundDto extends CustomNotFoundDto {
  @ApiProperty({ example: "Task not found" })
  declare message: string;

  @ApiProperty({ example: Methods.DELETE })
  declare method: Methods.DELETE;

  @ApiProperty({ example: "api/task/:id" })
  declare endpoint: string;

  @ApiProperty({ example: "Task not found" })
  declare error: string;
}

export class TaskDCRSubmissionNotFoundDto extends CustomNotFoundDto {
  @ApiProperty({ example: "Task not found" })
  declare message: string;

  @ApiProperty({ example: Methods.POST })
  declare method: Methods.POST;

  @ApiProperty({ example: "api/task/:id/dcr-submit" })
  declare endpoint: string;

  @ApiProperty({ example: "Task not found" })
  declare error: string;
}

export class TaskDCRSubmissionStatusUpdateNotFoundDto extends CustomNotFoundDto {
  @ApiProperty({ example: "Task not found" })
  declare message: string;

  @ApiProperty({ example: Methods.PATCH })
  declare method: Methods.PATCH;

  @ApiProperty({ example: "api/task/:id/dcr-submission-status" })
  declare endpoint: string;

  @ApiProperty({ example: "Task not found" })
  declare error: string;
}

export class TaskDCRReviewOnReplyNotFoundDto extends CustomNotFoundDto {
  @ApiProperty({ example: "Task not found" })
  declare message: string;

  @ApiProperty({ example: Methods.POST })
  declare method: Methods.POST;

  @ApiProperty({ example: "api/task/:id/reply-on-dcr-review" })
  declare endpoint: string;

  @ApiProperty({ example: "Task not found" })
  declare error: string;
}
