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

  /** Update the status of a task. */
  UPDATE_TASK_STATUS: { cmd: "update_task_status" },

  /** Delete a task. */
  DELETE_TASK: { cmd: "delete_task" },

  /** Submit a DCR for a task. */
  DCR_SUBMIT: { cmd: "dcr_submit" },

  /** Update the DCR submission status of a task. */
  UPDATE_DCR_SUBMISSION_STATUS: { cmd: "update_dcr_submission_status" },

  REPLY_ON_DCR_REVIEW: { cmd: "reply_on_dcr_review" },
} as const;
