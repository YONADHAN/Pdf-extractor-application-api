import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';
import fs from 'fs';
import { env } from '../config/env.validation.js';

//  Read env with defaults
const LOG_LEVEL = env.LOG_LEVEL;
const LOG_DIR = env.LOG_DIR;

const ACCESS_LOG_DIR = env.ACCESS_LOG_DIR ?? path.join(LOG_DIR, 'access');
const ACCESS_LOG_RETENTION_DAYS = env.ACCESS_LOG_RETENTION_DAYS ?? '14';
const ACCESS_LOG_MAX_SIZE = env.ACCESS_LOG_MAX_SIZE ?? '10m';

const ERROR_LOG_DIR = env.ERROR_LOG_DIR ?? path.join(LOG_DIR, 'error');
const ERROR_LOG_RETENTION_DAYS = env.ERROR_LOG_RETENTION_DAYS ?? '30';
const ERROR_LOG_MAX_SIZE = env.ERROR_LOG_MAX_SIZE ?? '10m';

//  Resolve absolute paths
const baseLogPath = path.join(process.cwd(), LOG_DIR);
const accessPath = path.join(process.cwd(), ACCESS_LOG_DIR);
const errorPath = path.join(process.cwd(), ERROR_LOG_DIR);

//  Ensure directories exist
[baseLogPath, accessPath, errorPath].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const accessTransport = new DailyRotateFile({
  filename: path.join(accessPath, '%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  maxSize: ACCESS_LOG_MAX_SIZE,
  maxFiles: `${ACCESS_LOG_RETENTION_DAYS}d`,
  level: 'info',
});

const errorTransport = new DailyRotateFile({
  filename: path.join(errorPath, '%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  maxSize: ERROR_LOG_MAX_SIZE,
  maxFiles: `${ERROR_LOG_RETENTION_DAYS}d`,
  level: 'error',
});

export const logger = winston.createLogger({
  level: LOG_LEVEL,
  format: winston.format.simple(),
  transports: [accessTransport, errorTransport],
});
