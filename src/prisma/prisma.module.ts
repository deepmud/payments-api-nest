import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // 👈 important
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
