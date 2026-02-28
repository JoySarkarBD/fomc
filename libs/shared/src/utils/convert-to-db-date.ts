/**
 * Convert date to Bangladesh date (UTC+6) and set time to 00:00:00
 *
 * @param date - The input date to be converted to Bangladesh date.
 * @returns A new Date object representing the input date converted to Bangladesh date with time set to 00:00:00.
 */
export const convertToBDDate = (date: Date) => {
  const utcDate = new Date(date);
  const bdDate = new Date(
    utcDate.toLocaleString("en-US", { timeZone: "Asia/Dhaka" }),
  );
  bdDate.setHours(0, 0, 0, 0);
  return bdDate;
};
