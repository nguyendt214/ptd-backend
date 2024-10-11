import { Injectable } from '@nestjs/common';
import * as webpush from 'web-push';
import { ConfigService } from '@nestjs/config';
import {
  SubscriptionService,
  PushSubscription,
} from '../subscription/subscription.service';

@Injectable()
export class NotificationService {
  constructor(
    private readonly configService: ConfigService,
    private readonly subscriptionService: SubscriptionService,
  ) {
    const vapidPublicKey = this.configService.get<string>('VAPID_PUBLIC_KEY');
    const vapidPrivateKey = this.configService.get<string>('VAPID_PRIVATE_KEY');

    webpush.setVapidDetails(
      'mailto:kevinblack.ico@gmail.com', // Replace with your email
      vapidPublicKey,
      vapidPrivateKey,
    );
  }

  async sendNotification(
    title: string,
    message: string,
    data?: any,
  ): Promise<void> {
    const payload = JSON.stringify({
      title,
      message,
      data,
    });

    const subscriptions: PushSubscription[] =
      this.subscriptionService.getAllSubscriptions();
    console.log(subscriptions);
    for (const subscription of subscriptions) {
      try {
        await webpush.sendNotification(subscription, payload);
        console.log('Notification sent to:', subscription.endpoint);
      } catch (error) {
        console.error(
          'Error sending notification to:',
          subscription.endpoint,
          error,
        );
        // Optionally remove invalid subscriptions
        if (error.statusCode === 410 || error.statusCode === 404) {
          // this.subscriptionService.removeSubscription(subscription.endpoint);
        }
      }
    }
  }
}
