import { Controller, Post, Body, Delete } from '@nestjs/common';
import { SubscriptionService, PushSubscription } from './subscription.service';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  addSubscription(@Body() subscription: PushSubscription) {
    this.subscriptionService.addSubscription(subscription);
    return { message: 'Subscription added successfully.' };
  }

  @Delete()
  removeSubscription(@Body('endpoint') endpoint: string) {
    this.subscriptionService.removeSubscription(endpoint);
    return { message: 'Subscription removed successfully.' };
  }
}
