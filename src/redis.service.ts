import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  private readonly redisClient: Redis;

  constructor() {
    this.redisClient = new Redis();
  }

  async saveData(key: string, value: string): Promise<void> {
    await this.redisClient.set(key, value);
  }

  async getData(key: string): Promise<string | null> {
    return this.redisClient.get(key);
  }
}
