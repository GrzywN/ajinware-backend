import config from 'config';
import Redis from 'ioredis';
import { inject, register } from '../utils/service-locator.ts';
import logger from './logger.ts';

const redisClient = new Redis({
  host: config.get('redis.host'),
  port: config.get('redis.port'),
  retryStrategy: (times) => Math.min(times * 50, 2000),
});

redisClient.on('error', (error) => {
  logger.error('Redis connection error:', error);
});

redisClient.on('connect', () => {
  logger.info('Successfully connected to Redis');
});

register(
  Redis,
  () => redisClient,
  (instance) => instance.quit(),
);

export default () => inject(Redis);
