import { RedisClient } from './redis.connect';

export class PublishService {
  private publishRedis: RedisClient;

  constructor() {
    this.publishRedis = new RedisClient();
  }

  async publish(key: string, value: string) {
    try {
      if (!key || !value) {
        return {
          result: false,
          message: 'Key and Value are required',
        };
      }

      await this.publishRedis.client.setex(key, 60, value);

      return {
        result: true,
        data: {
          key,
          value,
        },
      };
    } catch (error) {
      throw error;
    }
  }
}
