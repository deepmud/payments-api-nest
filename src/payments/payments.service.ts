import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
@Injectable()
export class PaymentsService {
  async create(dto: CreatePaymentDto) {
    // Create intent only (NO money logic)
    return {
      status: 'PENDING',
      reference: dto.reference,
    };
  }
}
