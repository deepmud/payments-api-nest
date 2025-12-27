import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentsModule } from './payments/payments.module';
import { WebhooksModule } from './webhooks/webhooks.module';
import { JobsModule } from './jobs/jobs.module';
import { ReconciliationModule } from './reconciliation/reconciliation.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { BullModule } from '@nestjs/bullmq';
import { PaymentsController } from './payments/payments.controller';

@Module({
  imports: [PaymentsModule, WebhooksModule, PrismaModule,JobsModule, ReconciliationModule, BullModule.forRoot({
    connection: {
      host: 'localhost',  // replace with your Redis host
      port: 6379,
    },
  }),],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

