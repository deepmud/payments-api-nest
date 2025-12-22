import { Injectable,Controller,Post,Req,Body,OnModuleInit,Headers, UnauthorizedException } from '@nestjs/common';
import * as crypto from 'crypto';
import { PaymentsQueue } from 'src/jobs/payments.queue';



@Controller('webhooks')
export class WebhooksController {
  private secret = process.env.WEBHOOK_SECRET || 'secret';

  constructor(private readonly queue: PaymentsQueue) {}

  @Post('provider')
  async handle(
    @Req() req: any,
    @Headers('x-signature') signature: string,
  ) {
    const hash = crypto
      .createHmac('sha256', this.secret)
      .update(req.rawBody)
      .digest('hex');

    if (hash !== signature) {
      throw new UnauthorizedException('Invalid signature');
    }

    await this.queue.enqueue(req.body);
    return { received: true };
  }
}
