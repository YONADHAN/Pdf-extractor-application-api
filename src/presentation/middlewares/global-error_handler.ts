import type { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import { CustomError } from '../../shared/error/customErrorHandler.js';
import { logger } from '../../shared/logger/logger.js';
import { ZodError } from 'zod';

export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const requestId = req.requestId ?? 'unknown';

  logger.error(
    `[${requestId}] ${err.message} - ${req.method} ${req.originalUrl}\n${err.stack}`,
  );

  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  if (err instanceof ZodError) {
    const validationErrors = err.issues.map((err) => err.message);
    new CustomError(validationErrors.join(', '), 400);
    return;
  }

  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }

  if (err.message === 'Only PDF files are allowed') {
    return res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
};
