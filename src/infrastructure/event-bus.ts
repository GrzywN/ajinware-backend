import { Redis } from 'ioredis';
import logger from '../config/logger.ts';
import injectRedis from '../config/redis.ts';
import { inject, register } from '../utils/service-locator.ts';

class EventBus {
  private handlers: Map<string, Function[]>;

  constructor(
    private publisher: Redis,
    private subscriber: Redis,
  ) {
    this.publisher = publisher;
    this.subscriber = subscriber;
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

  async stop(): Promise<void> {
    await this.publisher.quit();
    await this.subscriber.quit();

    logger.info('EventBus stopped');
  }
}

register(
  EventBus,
  () => new EventBus(injectRedis(), injectRedis()),
  async (instance) => instance.stop(),
);

export { EventBus };

export default () => inject(EventBus);
