/**
 * @fileoverview TCP message-pattern commands for the **Task** domain.
 *
 * Used by the API Gateway and Workforce microservice to communicate
 * task CRUD operations over the TCP transport.
 */

export const TASK_COMMANDS = {
  /** Retrieve all tasks. */
  GET_TASKS: { cmd: "get_tasks" },

  /** Retrieve a single task by ID. */
  GET_TASK: { cmd: "get_task" },

  /** Create a new task. */
  CREATE_TASK: { cmd: "create_task" },

  /** Update an existing task. */
  UPDATE_TASK: { cmd: "update_task" },

  /** Delete a task. */
  DELETE_TASK: { cmd: "delete_task" },
} as const;
