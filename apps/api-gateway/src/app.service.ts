/**
 * @fileoverview Root application service.
 */

import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  /** @returns Human-readable status message for the health-check endpoint. */
  getHello(): string {
    return "API Gateway - Microservices are running!";
  }
}
