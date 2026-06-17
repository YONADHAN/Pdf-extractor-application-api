import type { SignOptions } from 'jsonwebtoken';
import { z } from 'zod';

const envSchema = z.object({
  // Server
  PORT: z.coerce.number().default(3000),
  ENV: z.enum(['development', 'production', 'test']).default('development'),
  CORS_FRONTEND_URL_PROD: z.string().min(1),
  CORS_FRONTEND_URL_DEV: z.string().min(1),

  // DB
  MONGO_URI: z.string().min(1),

  // JWT
  ACCESS_TOKEN_SECRET: z.string().min(1),
  ACCESS_TOKEN_EXPIRES_IN: z.string().default('15m'),
  REFRESH_TOKEN_SECRET: z.string().min(1),
  REFRESH_TOKEN_EXPIRES_IN: z.string().default('7d'),

  // Cookies
  COOKIE_SECRET: z.string().min(1),
  COOKIE_EXPIRES_IN: z.string().default('7d'),
  COOKIE_SECURE: z.coerce.boolean().default(false),
  COOKIE_SAME_SITE: z.string().default('lax'),
  COOKIE_HTTP_ONLY: z.coerce.boolean().default(true),
  COOKIE_PATH_ACCESS_TOKEN: z.string().default('/api/auth/login'),
  COOKIE_PATH_REFRESH_TOKEN: z.string().default('/api/auth/refresh-token'),

  // Logging
  LOG_LEVEL: z.string().default('info'),
  LOG_DIR: z.string().default('logs'),
  ACCESS_LOG_DIR: z.string().default('logs/access'),
  ACCESS_LOG_RETENTION_DAYS: z.coerce.number().default(14),
  ACCESS_LOG_MAX_SIZE: z.string().default('10m'),
  ERROR_LOG_DIR: z.string().default('logs/error'),
  ERROR_LOG_RETENTION_DAYS: z.coerce.number().default(30),
  ERROR_LOG_MAX_SIZE: z.string().default('10m'),

  //NODEMAILER
  NODEMAILER_EMAIL: z.string(),
  NODEMAILER_PASSWORD: z.string(),

  //CLOUDINARY
  CLOUD_NAME: z.string(),
  CLOUD_API_KEY: z.string(),
  CLOUD_API_SECRET: z.string(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:');

  parsed.error.issues.forEach((err) => {
    console.error(`- ${err.path.join('.')}: ${err.message}`);
  });
  process.exit(1);
}

const env = parsed.data;

// config object
export const config = {
  server: {
    port: env.PORT,
    env: env.ENV,
  },
  database: {
    mongoUri: env.MONGO_URI,
  },
  jwt: {
    accessTokenSecret: env.ACCESS_TOKEN_SECRET,
    accessTokenExpiresIn:
      env.ACCESS_TOKEN_EXPIRES_IN as SignOptions['expiresIn'],
    refreshTokenSecret: env.REFRESH_TOKEN_SECRET,
    refreshTokenExpiresIn:
      env.REFRESH_TOKEN_EXPIRES_IN as SignOptions['expiresIn'],
  },
  cookie: {
    secret: env.COOKIE_SECRET,
    expiresIn: env.COOKIE_EXPIRES_IN,
    secure: env.COOKIE_SECURE,
    sameSite: env.COOKIE_SAME_SITE,
    httpOnly: env.COOKIE_HTTP_ONLY,
    pathAccessToken: env.COOKIE_PATH_ACCESS_TOKEN,
    pathRefreshToken: env.COOKIE_PATH_REFRESH_TOKEN,
  },
  logging: {
    level: env.LOG_LEVEL,
    dir: env.LOG_DIR,
    accessLogDir: env.ACCESS_LOG_DIR,
    accessLogRetentionDays: env.ACCESS_LOG_RETENTION_DAYS,
    accessLogMaxSize: env.ACCESS_LOG_MAX_SIZE,
    errorLogDir: env.ERROR_LOG_DIR,
    errorLogRetentionDays: env.ERROR_LOG_RETENTION_DAYS,
    errorLogMaxSize: env.ERROR_LOG_MAX_SIZE,
  },
  cors: {
    corsFrontendUrlProd: env.CORS_FRONTEND_URL_PROD,
    corsFrontendUrlDev: env.CORS_FRONTEND_URL_DEV,
  },
  nodemailer: {
    email: env.NODEMAILER_EMAIL,
    password: env.NODEMAILER_PASSWORD,
  },
  cloudinary: {
    cloud_name: env.CLOUD_NAME,
    cloud_api_key: env.CLOUD_API_KEY,
    cloud_api_secret: env.CLOUD_API_SECRET,
  },
};

export { env };
