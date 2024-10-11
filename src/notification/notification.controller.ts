import { Controller, Post, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async sendNotification(
    @Body() body: { title: string; message: string; data?: any },
  ) {
    const { title, message, data } = body;
    await this.notificationService.sendNotification(title, message, data);
    return { message: 'Notifications sent successfully.' };
  }
}
