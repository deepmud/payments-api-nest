import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class PaymentsProducer {
  constructor(@InjectQueue('payments') private readonly queue: Queue) {}

  async addPaymentJob(data: any) {
    await this.queue.add('process-payment', data);
  }
}
