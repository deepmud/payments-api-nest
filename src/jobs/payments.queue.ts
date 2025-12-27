import { InjectQueue } from '@nestjs/bullmq';
import { Injectable,  } from '@nestjs/common';
import { Queue } from 'bullmq';


@Injectable()
export class PaymentsQueue {
  constructor(@InjectQueue('payments') private queue: Queue) {}

  async enqueue(event: any) {
    await this.queue.add('process', event, {
      attempts: 5,
      backoff: { type: 'exponential', delay: 2000 },
    });

    
    console.log("body", 'queueddddd');

  }
}
