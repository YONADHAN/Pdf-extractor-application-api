import type { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';
import { logger } from '../../shared/logger/logger.js';
export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const start = Date.now();
  const requestId = randomUUID();

  req.requestId = requestId;

  res.on('finish', () => {
    const duration = Date.now() - start;
    const date = new Date().toISOString();

    const statusType =
      res.statusCode >= 500 ? 'ERROR' : res.statusCode >= 400 ? 'WARN' : 'INFO';

    const contentLength = res.getHeader('content-length') || 0;

    logger.info(
      `[${date}] [${statusType}] [${requestId}] ${req.method} ${
        req.originalUrl
      } ${res.statusCode} ${duration}ms ${req.ip} ${
        req.headers['user-agent']
      } size:${contentLength}`,
    );
  });

  next();
};
