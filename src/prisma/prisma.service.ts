import { Injectable ,OnModuleInit} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {constructor() {
    super({
      datasources: {
        db: { url: process.env.DATABASE_URL! },
      },
    });

   
  }

  async onModuleInit() {
    await this.$connect();
  }}


// import 'dotenv/config';
// import { Injectable, OnModuleInit } from '@nestjs/common';
// //import { PrismaClient } from 'generated/prisma/client';
// //import { PrismaClient } from '../generated';  // path must match output
// import { PrismaClient } from '@prisma/client';

// @Injectable()
// export class PrismaService extends PrismaClient implements OnModuleInit {

//   async onModuleInit() {
//     await this.$connect();
//   }
// }
