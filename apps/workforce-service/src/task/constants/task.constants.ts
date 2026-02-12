export const TASK_COMMANDS = {
  GET_TASKS: { cmd: "get_tasks" },
  GET_TASK: { cmd: "get_task" },
  CREATE_TASK: { cmd: "create_task" },
  UPDATE_TASK: { cmd: "update_task" },
  DELETE_TASK: { cmd: "delete_task" },
} as const;

export const TASK_COMMAND_NAMES = {
  GET_TASKS: "get_tasks",
  GET_TASK: "get_task",
  CREATE_TASK: "create_task",
  UPDATE_TASK: "update_task",
  DELETE_TASK: "delete_task",
} as const;
