/**
 * @fileoverview Redis client service for the API Gateway.
 * Manages dedicated Redis connections for auth tokens, sessions, and throttling.
 */
import { Injectable, OnModuleDestroy } from "@nestjs/common";
import config from "@shared/config/app.config";
import Redis from "ioredis";

/**
 * Manages dedicated Redis connections for auth tokens, sessions, and throttling.
 * Implements `OnModuleDestroy` to gracefully close connections on shutdown.
 */
@Injectable()
export class RedisClientService implements OnModuleDestroy {
  private readonly clientAuth: Redis;
  private readonly clientSession: Redis;
  private readonly clientThrottle: Redis;

  constructor() {
    this.clientAuth = new Redis({
      host: config.REDIS_HOST ?? "127.0.0.1",
      port: Number(config.REDIS_PORT ?? 6379),
      password: config.REDIS_PASSWORD || undefined,
      db: config.REDIS_DB_AUTH ? Number(config.REDIS_DB_AUTH) : undefined,
    });

    /** Throttle-scoped Redis client. */
    this.clientThrottle = new Redis({
      host: config.REDIS_HOST ?? "127.0.0.1",
      port: Number(config.REDIS_PORT ?? 6379),
      password: config.REDIS_PASSWORD || undefined,
      db: config.REDIS_DB_THROTTLE
        ? Number(config.REDIS_DB_THROTTLE)
        : undefined,
    });

    /** Session-scoped Redis client. */
    this.clientSession = new Redis({
      host: config.REDIS_HOST ?? "127.0.0.1",
      port: Number(config.REDIS_PORT ?? 6379),
      password: config.REDIS_PASSWORD || undefined,
      db: config.REDIS_DB_SESSION ? Number(config.REDIS_DB_SESSION) : undefined,
    });
  }

  /** Returns the auth-scoped Redis client. */
  getClientAuth() {
    return this.clientAuth;
  }

  /** Returns the session-scoped Redis client. */
  getClientSession() {
    return this.clientSession;
  }

  getClientThrottle() {
    return this.clientThrottle;
  }

  /** Gracefully close all Redis connections on module teardown. */
  async onModuleDestroy() {
    await this.clientAuth.quit();
    await this.clientSession.quit();
    await this.clientThrottle.quit();
  }
}
