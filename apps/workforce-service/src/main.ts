import { NestFactory } from "@nestjs/core";
import { WorkforceModule } from "./workforce.module";

async function bootstrap() {
  const app = await NestFactory.create(WorkforceModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
