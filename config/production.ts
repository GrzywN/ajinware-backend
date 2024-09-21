export default {
  port: 3051,
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
  logLevel: 'warn',
};
