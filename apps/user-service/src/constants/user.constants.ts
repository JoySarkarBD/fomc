export const USER_COMMANDS = {
  GET_USERS: { cmd: "get_users" },
  GET_USER: { cmd: "get_user" },
  CREATE_USER: { cmd: "create_user" },
  UPDATE_USER: { cmd: "update_user" },
  DELETE_USER: { cmd: "delete_user" },
  FIND_BY_EMAIL: { cmd: "find_user_by_email" },
  SET_RESET_PASSWORD_OTP: { cmd: "set_reset_password_otp" },
  RESET_PASSWORD: { cmd: "reset_password" },
  CHANGE_PASSWORD: { cmd: "change_password" },
} as const;
