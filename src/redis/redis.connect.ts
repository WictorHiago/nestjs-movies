import { Redis } from 'ioredis';

export class RedisClient {
  public client: Redis;

  constructor() {
    this.client = new Redis({
      port: 6379,
      host: 'localhost',
    });
  }
}
