/**
 * @fileoverview TCP message-pattern commands for the **Attendance** domain.
 *
 * Used by the API Gateway and Workforce microservice to communicate
 * attendance operations over the TCP transport.
 *
 * @module @shared/constants/attendance-command
 */

export const ATTENDANCE_COMMANDS = {
  /** Mark a user as present for the day. */
  PRESENT_ATTENDANCE: { cmd: "present_attendance" },

  /** Record a user's check-out time. */
  OUT_ATTENDANCE: { cmd: "out_attendance" },

  /** Swap a weekend day with a working day. */
  WEEKEND_EXCHANGE: { cmd: "weekend_exchange" },

  /** Retrieve the authenticated user's attendance records, optionally filtered by month and year. */
  GET_MY_ATTENDANCE: { cmd: "get_my_attendance" },

  /** Retrieve attendance records for a specific user, optionally filtered by month and year. */
  GET_SPECIFIC_USER_ATTENDANCE: { cmd: "get_specific_user_attendance" },
} as const;
