import { Module } from '@nestjs/common';
import { PaymentsWorker } from './payments.worker';
import { PaymentsProducer } from './payments.producer';
import { PrismaModule } from '../prisma/prisma.module';
import { BullModule } from '@nestjs/bullmq';
import { PaymentsQueue } from './payments.queue';

@Module({
  imports: [
    PrismaModule,
    BullModule.registerQueue({
      name: 'payments', connection: {
        host: process.env.REDIS_HOST,
      port: +(process.env.REDIS_PORT ?? '6379')
      },
    }),
  ],
  providers: [PaymentsProducer,PaymentsQueue, PaymentsWorker],
  exports:[PaymentsQueue]
})
export class JobsModule {}


// @Module({})
// export class JobsModule {}


// @Module({
//     imports: [
//       BullModule.registerQueue({
//         name: 'payments',
//       }),
//     ],
//     providers: [PaymentsQueue, PaymentsWorker],
//   })
//   export class JobsModule {}
  



// @Module({
//   imports: [
//     BullModule.registerQueue({
//       name: 'payments',
//       connection: {
//         host: process.env.REDIS_HOST,
//       port: +(process.env.REDIS_PORT ?? '6379')
//       },
//     }),
//   ],
//   providers: [PaymentsProducer, PaymentsWorker],
//   exports: [PaymentsProducer],
// })
// export class JobsModule {}


