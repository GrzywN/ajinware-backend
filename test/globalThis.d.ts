/* eslint-disable no-unused-vars */
/* eslint-disable no-var */

import { type StartedRedisContainer } from '@testcontainers/redis/build/redis-container';

/* eslint-disable vars-on-top */
declare global {
  var __REDIS_CONTAINER__: StartedRedisContainer;
}
