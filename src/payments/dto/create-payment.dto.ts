import { IsString, IsInt } from 'class-validator';

export class CreatePaymentDto {
    @IsString()
    reference: string;
  
    @IsInt()
    amount: number;
  
    @IsString()
    currency: string;
}
