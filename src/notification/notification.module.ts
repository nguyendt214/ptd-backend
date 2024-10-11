import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { SubscriptionService } from '../subscription/subscription.service';

@Module({
  providers: [NotificationService, SubscriptionService],
  controllers: [NotificationController],
})
export class NotificationModule {}
