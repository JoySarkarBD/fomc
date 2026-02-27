/**
 * @fileoverview Shape of the authenticated user attached to the request.
 *
 * After a successful JWT validation the `JwtStrategy` fetches the
 * full user record and places it on `request.user`. This interface
 * describes the public (non-sensitive) fields available from there.
 */

export interface AuthUser {
  id?: string;
  _id?: string;
  name?: string;
  employeeId?: string;
  phoneNumber?: string;
  email?: string;
  secondaryEmail?: string;
  role?: string;
  department?: string;
  designation?: string;
}
