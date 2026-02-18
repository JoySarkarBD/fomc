/**
 * @fileoverview Attendance Shift Timing Constants
 *
 * Defines the shift timing configurations for different departments.
 * Sales has three rotating shifts (morning, evening, night) while
 * Operations has a day/night split. A 15-minute grace period applies.
 *
 * Note: ATTENDANCE_COMMANDS have been moved to `@shared/constants/attendance-command.constants`.
 */

/* 
  attendance logic:-
  for the sales department er jonno 3 ta shifting

  shift-timing er sathe 15 min er modhye attendance mark korte hobe, otherwise late mark hobe
*/
export const ATTENDANCE_SALES_SHIFT_TIMINGS = {
  MORNING_SHIFT: { start: "07:00", end: "15:00" },
  EVENING_SHIFT: { start: "15:00", end: "23:00" },
  NIGHT_SHIFT: { start: "23:00", end: "07:00" },
} as const;

/**
 * attendance logic:-
 * operation department er jonno ekta shifting
 * shift-timing er sathe 15 min er modhye attendance mark korte hobe, otherwise late mark hobe
 *
 * in future shifting multiple hote pare
 */
export const ATTENDANCE_OPERATION_SHIFT_TIMINGS = {
  DAY_SHIFT: { start: "09:00", end: "18:00" },
  NIGHT_SHIFT: { start: "18:00", end: "03:00" },
} as const;
