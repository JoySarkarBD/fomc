import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import {
  Notification,
  NotificationDocument,
} from "./schema/notification.schema";

@Injectable()
export class NotificationServiceService {
  constructor(
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<NotificationDocument>,
  ) {}

  async createNotification(data: CreateNotificationDto) {
    const notification = await this.notificationModel.create({
      receiver: data.receiver.map((id) => new Types.ObjectId(id)),
      sender: new Types.ObjectId(data.sender),
      title: data.title,
      message: data.message,
      type: data.type,
      referenceModel: data.referenceModel,
      referenceId: new Types.ObjectId(data.referenceId),
      isRead: false,
    });
    return notification;
  }

  async getUserNotifications(data: { userId: string }) {
    return await this.notificationModel
      .find({ receiver: new Types.ObjectId(data.userId) })
      .sort({ createdAt: -1 })
      .exec();
  }

  async markAsRead(data: { notificationId: string }) {
    return await this.notificationModel
      .findByIdAndUpdate(
        new Types.ObjectId(data.notificationId),
        { isRead: true },
        { new: true },
      )
      .exec();
  }

  async markAsUnread(data: { notificationId: string }) {
    return await this.notificationModel
      .findByIdAndUpdate(
        new Types.ObjectId(data.notificationId),
        { isRead: false },
        { new: true },
      )
      .exec();
  }
}
