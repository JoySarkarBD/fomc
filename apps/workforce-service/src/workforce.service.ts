import { Injectable } from "@nestjs/common";

@Injectable()
export class WorkforceService {
  getHello(): string {
    return "Hello World!";
  }
}
