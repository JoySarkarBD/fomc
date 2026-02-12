import { Controller, Get } from "@nestjs/common";
import { WorkforceService } from "./workforce.service";

@Controller()
export class WorkforceController {
  constructor(private readonly workforceService: WorkforceService) {}

  @Get()
  getHello(): string {
    return this.workforceService.getHello();
  }
}
