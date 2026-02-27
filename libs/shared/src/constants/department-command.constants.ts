/**
 * @fileoverview TCP message-pattern commands for the **Department** domain.
 *
 * Used by the API Gateway and Workforce microservice to communicate
 * department CRUD operations over the TCP transport.
 */

export const DEPARTMENT_COMMANDS = {
  /** Retrieve a paginated list of departments. */
  GET_DEPARTMENTS: { cmd: "get_departments" },

  /** Retrieve a single department by ID. */
  GET_DEPARTMENT: { cmd: "get_department" },

  /** Create a new department. */
  CREATE_DEPARTMENT: { cmd: "create_department" },

  /** Update an existing department's name or description. */
  UPDATE_DEPARTMENT: { cmd: "update_department" },

  /** Delete a department (blocked if it has designations or users). */
  DELETE_DEPARTMENT: { cmd: "delete_department" },
} as const;
