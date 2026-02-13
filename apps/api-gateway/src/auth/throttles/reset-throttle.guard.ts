import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import * as crypto from "crypto";
import { Request } from "express";
import { RedisClientService } from "../../common/redis/redis.client";
import { RESET_PASSWORD } from "../constants/auth-throttle.constants";

@Injectable()
export class ResetThrottleGuard implements CanActivate {
  constructor(private readonly redis: RedisClientService) {}

  private hashIdentifier(identifier: string) {
    return crypto.createHash("sha256").update(identifier).digest("hex");
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    const identifierParts = [
      req.ip || "unknown",
      req.headers["user-agent"] || "unknown",
    ];
    const idRaw = identifierParts.join("|");
    const id = this.hashIdentifier(idRaw);

    const client = this.redis.getClientThrottle();
    const key = `${RESET_PASSWORD.KEY_PREFIX}:${id}`;

    const count = await client.incr(key);
    if (count === 1) {
      await client.expire(key, RESET_PASSWORD.TTL_SECONDS);
    }

    if (count > RESET_PASSWORD.LIMIT) {
      throw new HttpException(
        `Too many requests for reset-password. Try again later.`,
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    return true;
  }
}
