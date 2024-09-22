import { type Redis } from 'ioredis';
import logger from '../config/logger.ts';
import redisClient from '../config/redis.ts';

class EventBus {
  private publisher: Redis;

  private subscriber: Redis;

  private handlers: Map<string, Function[]>;

  constructor() {
    this.publisher = redisClient;
    this.subscriber = redisClient;
    this.handlers = new Map();
  }

  publish<T extends object>(eventName: string, payload: T): Promise<number> {
    logger.info(`Publishing event: ${eventName}`);

    return this.publisher.publish(eventName, JSON.stringify(payload));
  }

  subscribe<T extends Function = Function>(eventName: string, handler: T): void {
    if (!this.handlers.has(eventName)) {
      this.handlers.set(eventName, []);
      this.subscriber.subscribe(eventName);
    }

    this.handlers.get(eventName)!.push(handler);

    logger.info(`Subscribed to event: ${eventName}`);
  }

  start(): void {
    this.subscriber.on('message', (channel, message) => {
      logger.info(`Received message on channel: ${channel}`);

      const handlers = this.handlers.get(channel) || [];
      handlers.forEach((handler) => handler(JSON.parse(message)));
    });

    logger.info('EventBus started');
  }

  stop(): void {
    this.publisher.quit();
    this.subscriber.quit();

    logger.info('EventBus stopped');
  }
}

export default EventBus;
