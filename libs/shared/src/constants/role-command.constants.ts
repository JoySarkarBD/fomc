/**
 * @fileoverview TCP message-pattern commands for the **Role** domain.
 *
 * Used by the API Gateway and User microservice to communicate
 * role CRUD operations over the TCP transport.
 */

export const ROLE_COMMANDS = {
  /** Retrieve a paginated list of roles. */
  GET_ROLES: { cmd: "get_roles" },

  /** Retrieve a single role by ID (with permission & user counts). */
  GET_ROLE: { cmd: "get_role" },

  /** Create a new role. */
  CREATE_ROLE: { cmd: "create_role" },

  /** Update an existing role's name or description. */
  UPDATE_ROLE: { cmd: "update_role" },

  /** Delete a role (blocked for system roles or those in use). */
  DELETE_ROLE: { cmd: "delete_role" },
} as const;
