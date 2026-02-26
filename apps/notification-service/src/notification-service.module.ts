import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { MongooseConnectionsModule } from "@shared/database/mongoose-connections.module";
import { NotificationServiceController } from './notification-service.controller';
import { NotificationServiceService } from './notification-service.service';
import { Notification, NotificationSchema } from './schema/notification.schema';

@Module({
  imports: [
    MongooseConnectionsModule,
    MongooseModule.forFeature([
      {
        name: Notification.name,
        schema: NotificationSchema,
      },
    ]),
  ],
  controllers: [NotificationServiceController],
  providers: [NotificationServiceService],
})
export class NotificationServiceModule {}
