import { NextFunction, Request, Response } from 'express';
import { StructError } from 'superstruct';

function notFound(req: Request, res: Response, next: NextFunction): void {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

/* eslint-disable no-unused-vars */
function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  /* eslint-enable no-unused-vars */

  if (err instanceof StructError) {
    return res.status(422).json({ error: err.message });
  }

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  return res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
}

export { errorHandler, notFound };
