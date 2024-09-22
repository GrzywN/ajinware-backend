import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import api from './api/index.ts';
import logger from './config/logger.ts';
import EventBus from './infrastructure/event-bus.ts';
import { errorHandler, notFound } from './middlewares.ts';

dotenv.config();

const app = express();
const eventBus = new EventBus();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.use('/api/v1', api);

app.use(notFound);
app.use(errorHandler);

eventBus.start();

function shutdown() {
  logger.info('Shutting down');
  eventBus.stop();
  process.exit(0);
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

export default app;
