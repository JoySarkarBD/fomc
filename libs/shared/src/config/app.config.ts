/**
 * @fileoverview Centralized application configuration.
 *
 * Loads environment variables from `.env` using `dotenv` and
 * exposes them as a strongly-typed, frozen configuration object.
 * Every service in the monorepo should import config from here
 * instead of reading `process.env` directly.
 */

import dotenv from "dotenv";

dotenv.config();

/** Strongly-typed shape of the application configuration. */
interface AppConfig {
  /** Port the API Gateway listens on. */
  PORT: number;

  /** Hostname of the User microservice. */
  USER_SERVICE_HOST: string;
  /** TCP port of the User microservice. */
  USER_SERVICE_PORT: number;

  /** Hostname of the Workforce microservice. */
  WORKFORCE_SERVICE_HOST: string;
  /** TCP port of the Workforce microservice. */
  WORKFORCE_SERVICE_PORT: number;

  /** Hostname of the Notification microservice. */
  NOTIFICATION_SERVICE_HOST: string;
  /** TCP port of the Notification microservice. */
  NOTIFICATION_SERVICE_PORT: number;

  /** Minio Self Hosted S3 Endpoint **/
  MINIO_ENDPOINT: string;
  /** Minio Self Hosted S3 PORT **/
  MINIO_PORT: number;
  /** Minio Self Hosted S3 SLL **/
  MINIO_USE_SSL: boolean;
  /** Minio Self Hosted S3 Access Key **/
  MINIO_ACCESS_KEY: string;
  /** Minio Self Hosted S3 Secret Key **/
  MINIO_SECRET_KEY: string;
  /** Minio Self Hosted S3 Bucket Name **/
  MINIO_BUCKET: string;
  /** Minio Self Hosted S3 Public URL **/
  MINIO_PUBLIC_URL: string;
  /** Minio object expiration time in seconds for avatar uploads */
  MINIO_OBJECT_EXPIRATION_SECONDS_FOR_AVATAR: number;

  /** JWT token lifetime in seconds (default: 30 days). */
  JWT_EXPIRES_IN: number;
  /** Secret key used to sign JWT tokens. */
  JWT_SECRET: string;

  /** bcrypt salt rounds for password hashing. */
  BCRYPT_SALT_ROUNDS: number;

  /** Global rate-limit window in seconds. */
  RATE_LIMIT_TTL: number;
  /** Maximum requests allowed within the rate-limit window. */
  RATE_LIMIT_LIMIT: number;

  /** SMTP host for outgoing emails. */
  MAIL_HOST: string;
  /** SMTP port. */
  MAIL_PORT: number;
  /** SMTP authentication username. */
  MAIL_USER: string;
  /** SMTP authentication password / app password. */
  MAIL_PASS: string;
  /** Display name used in the `From` header. */
  MAIL_FROM_NAME: string;
  /** Email address used in the `From` header. */
  MAIL_FROM_EMAIL: string;

  /** MongoDB connection URI. */
  MONGO_URI: string;

  /** Redis server hostname. */
  REDIS_HOST: string;
  /** Redis server port. */
  REDIS_PORT: number;
  /** Redis server password (empty string if none). */
  REDIS_PASSWORD: string;
  /** Redis database index for auth tokens. */
  REDIS_DB_AUTH: number;
  /** Redis database index for session data. */
  REDIS_DB_SESSION: number;
  /** Redis database index for throttle counters. */
  REDIS_DB_THROTTLE: number;
}

/**
 * Reads a single environment variable and parses it as an integer.
 *
 * @param key - Name of the environment variable.
 * @returns The parsed integer value, or `NaN` if the variable is missing.
 */
const int = (key: string): number => parseInt(process.env[key] as string, 10);

/**
 * Reads a single environment variable as a string.
 *
 * @param key - Name of the environment variable.
 * @returns The raw string value.
 */
const str = (key: string): string => process.env[key] as string;

/** Application-wide configuration object. */
const config: AppConfig = {
  PORT: int("PORT"),

  USER_SERVICE_HOST: str("USER_SERVICE_HOST"),
  USER_SERVICE_PORT: int("USER_SERVICE_PORT"),

  WORKFORCE_SERVICE_HOST: str("WORKFORCE_SERVICE_HOST"),
  WORKFORCE_SERVICE_PORT: int("WORKFORCE_SERVICE_PORT"),

  NOTIFICATION_SERVICE_HOST: str("NOTIFICATION_SERVICE_HOST"),
  NOTIFICATION_SERVICE_PORT: int("NOTIFICATION_SERVICE_PORT"),

  MINIO_ENDPOINT: str("MINIO_ENDPOINT"),
  MINIO_PORT: int("MINIO_PORT"),
  MINIO_USE_SSL: (str("MINIO_USE_SSL") || "false") === "true",
  MINIO_ACCESS_KEY: str("MINIO_ACCESS_KEY"),
  MINIO_SECRET_KEY: str("MINIO_SECRET_KEY"),
  MINIO_BUCKET: str("MINIO_BUCKET"),
  MINIO_PUBLIC_URL: str("MINIO_PUBLIC_URL"),
  MINIO_OBJECT_EXPIRATION_SECONDS_FOR_AVATAR: int(
    "MINIO_OBJECT_EXPIRATION_SECONDS_FOR_AVATAR",
  ),

  JWT_EXPIRES_IN: int("JWT_EXPIRES_IN"),
  JWT_SECRET: str("JWT_SECRET"),

  BCRYPT_SALT_ROUNDS: int("BCRYPT_SALT_ROUNDS"),

  RATE_LIMIT_TTL: int("RATE_LIMIT_TTL"),
  RATE_LIMIT_LIMIT: int("RATE_LIMIT_LIMIT"),

  MAIL_HOST: str("MAIL_HOST"),
  MAIL_PORT: int("MAIL_PORT"),
  MAIL_USER: str("MAIL_USER"),
  MAIL_PASS: str("MAIL_PASS"),
  MAIL_FROM_NAME: str("MAIL_FROM_NAME"),
  MAIL_FROM_EMAIL: str("MAIL_FROM_EMAIL"),

  MONGO_URI: str("MONGO_URI"),

  REDIS_HOST: str("REDIS_HOST"),
  REDIS_PORT: int("REDIS_PORT"),
  REDIS_PASSWORD: str("REDIS_PASSWORD"),
  REDIS_DB_AUTH: int("REDIS_DB_AUTH"),
  REDIS_DB_SESSION: int("REDIS_DB_SESSION"),
  REDIS_DB_THROTTLE: int("REDIS_DB_THROTTLE"),
};

export default config;
