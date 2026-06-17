import express from 'express';

import cors from 'cors';

import helmet from 'helmet';

import rateLimit from 'express-rate-limit';

import cookieParser from 'cookie-parser';

import { globalErrorHandler } from './presentation/middlewares/global-error_handler.js';

import { loggerMiddleware } from './presentation/middlewares/logger_middleware.js';

import { AuthRoute } from './presentation/routes/auth_route.js';

import { PdfRoute } from './presentation/routes/pdf_route.js';
import { config } from './shared/config/env.validation.js';

const authRoute = new AuthRoute();

const pdfRoute = new PdfRoute();

const app = express();

app.use(helmet());

app.use(
  cors({

    origin: [config.cors.corsFrontendUrlDev, config.cors.corsFrontendUrlProd],

    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],

    credentials: true,
  }),
);

app.use(
  express.json({
    limit: '10mb',
  }),
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  max: 100,

  message: {
    success: false,

    message: 'Too many requests. Try again later.',
  },

  standardHeaders: true,

  legacyHeaders: false,
});

app.use(limiter);

app.use(loggerMiddleware);

app.use(cookieParser());

app.use('/api/auth', authRoute.getRouter());

app.use('/api/pdf', pdfRoute.getRouter());

app.use(globalErrorHandler);

export { app };
