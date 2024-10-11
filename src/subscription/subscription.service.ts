import { Injectable } from '@nestjs/common';

export interface PushSubscription {
  endpoint: string;
  expirationTime: any;
  keys: {
    p256dh: string;
    auth: string;
  };
}

@Injectable()
export class SubscriptionService {
  private subscriptions: PushSubscription[] = [
    {
      endpoint:
        'https://fcm.googleapis.com/fcm/send/eev3h0_Fy3I:APA91bEaxuLlvabPt0xfbSMpehqH6hjibO3gClHtZtPNkuXtEK4b1gzYVmWUIWDEX0p-KBiDbTSCPpoLivCBDcBlE5wX6GS2RAc9Sk-FAsyxBLuR3J8PsPP8P3KTVrYJCaSXiP-ppPn7',
      expirationTime: null,
      keys: {
        p256dh:
          'BKDIg8et2UqsLptkjnIgsn4iaxcjo5XZe4w0-cXO4EHiBJQjhJpCqhM5-ogLp39wqtj0hdF9eecL_UnIQva2n_8',
        auth: 'BhsiMETTAhrQHfk3FNCf4g',
      },
    },
  ];

  addSubscription(subscription: PushSubscription): void {
    const exists = this.subscriptions.find(
      (sub) => sub.endpoint === subscription.endpoint,
    );
    if (!exists) {
      this.subscriptions.push(subscription);
      console.log('Subscription added:', this.subscriptions);
    } else {
      console.log('Subscription already exists:', subscription.endpoint);
    }
  }

  getAllSubscriptions(): PushSubscription[] {
    return this.subscriptions;
  }

  removeSubscription(endpoint: string): void {
    this.subscriptions = this.subscriptions.filter(
      (sub) => sub.endpoint !== endpoint,
    );
    console.log('Subscription removed:', endpoint);
  }
}
