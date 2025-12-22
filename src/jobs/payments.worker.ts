import { Injectable } from '@nestjs/common';
import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaymentsWorker extends WorkerHost {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  /**
   * This method handles all jobs from the "payments" queue.
   */
  async process(job: Job<any>) {
    const e = job.data;

    try {
      await this.prisma.payment.create({
        data: {
          provider: e.provider,
          providerEventId: e.id,
          reference: e.reference,
          amount: e.amount,
          currency: e.currency,
          status: 'SUCCESS',
          rawPayload: e,
        },
      });
    } catch (err: any) {
      // Handle duplicate entries gracefully (idempotency)
      if (err.code === 'P2002') return; // Prisma unique constraint violation
      throw err;
    }
  }
}


// import { Processor, Process  } from "@nestjs/bullmq";
// import { PrismaService } from "../prisma/prisma.service";
// import { Job } from "bullmq";


// @Processor('payments')
// export class PaymentsWorker {
//   constructor(private prisma: PrismaService) {}

//   @Process('process')
//   async handle(job: Job<any>) {
//     const e = job.data;

//     try {
//       await this.prisma.payment.create({
//         data: {
//           provider: e.provider,
//           providerEventId: e.id,
//           reference: e.reference,
//           amount: e.amount,
//           currency: e.currency,
//           status: 'SUCCESS',
//           rawPayload: e,
//         },
//       });
//     } catch (err) {
//       if (err.code === 'P2002') return; // idempotent
//       throw err;
//     }
//   }
// }
