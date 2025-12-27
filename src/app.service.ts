import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
@Injectable()
export class AppService {
  private redis = new Redis({ host: 'localhost', port: 6379 });
 // should return "PONG"
  async getHello(): Promise<string> {
    return 'Hello World3!' + await this.redis.ping();
  }
}
