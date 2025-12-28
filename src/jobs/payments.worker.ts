import { Injectable } from '@nestjs/common';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
@Processor('payments')
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
      console.log("worker alert","i am in worker now by redis")
      await this.handlePayment(e);
    } catch (err: any) {
      // Handle duplicate entries gracefully (idempotency)
      if (err.code === 'P2002') return; // Prisma unique constraint violation
      throw err;
    }
  }


  private async handlePayment(e: any) {
        try {
          console.log("worker alert","i am in worker now by redisdeeee")
    
         return await this.prisma.payment.upsert({
            where: { provider_providerEventId: {
              provider: e.provider,
              providerEventId: e.id,
            }, },
            update: { status: 'SUCCESS' },
            create: {
           
              provider: e.provider,
              providerEventId: e.id,
              reference: e.reference,
              amount: e.amount,
              currency: e.currency,
              status: 'SUCCESS',
              rawPayload: e,
            
          }}
          );

         } catch (err: any) {
        // Handle duplicate entries gracefully (idempotency)
        if (err.code === 'P2002') return; // Prisma unique constraint violation
        throw err;
      }
    }
}

