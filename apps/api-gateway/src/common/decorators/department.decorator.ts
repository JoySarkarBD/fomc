import { SetMetadata } from "@nestjs/common";

export const DEPARTMENT_KEY = "departments";
export const Departments = (...departments: string[]) =>
  SetMetadata(DEPARTMENT_KEY, departments);

/**
 * Specifically restricts a route to only users in the "SALES" department.
 */
export const SalesOnly = () => SetMetadata(DEPARTMENT_KEY, ["SALES"]);
