import { Injectable,Controller,Post, Body,OnModuleInit } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly service: PaymentsService) {}

  @Post('create')
  create(@Body() dto: CreatePaymentDto) {
    console.log("body", dto);
  //return { received: dto.amount };
    return this.service.create(dto);
  }
}
