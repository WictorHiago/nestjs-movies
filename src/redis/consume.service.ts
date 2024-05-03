import { RedisClient } from './redis.connect';

export class ConsumeService {
  private consumeRedis: RedisClient;

  constructor() {
    this.consumeRedis = new RedisClient();
  }

  async consume(key: string) {
    const value = await this.consumeRedis.client.get(key);
    if (!value) {
      return null;
    }

    return {
      key,
      value,
    };
  }
}
