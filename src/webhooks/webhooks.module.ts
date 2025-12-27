import { Module } from '@nestjs/common';
import { WebhooksController } from './webhooks.controller';
import { JobsModule } from 'src/jobs/jobs.module';
import { BullModule } from '@nestjs/bullmq';
import { PaymentsQueue } from 'src/jobs/payments.queue';

@Module({
    imports: [ JobsModule, BullModule.registerQueue({
        name: 'payments', connection: {
          host: process.env.REDIS_HOST,
        port: +(process.env.REDIS_PORT ?? '6379')
        },
      }),],
    controllers: [WebhooksController],// <-- must include
    providers:[PaymentsQueue]

})
export class WebhooksModule {}

