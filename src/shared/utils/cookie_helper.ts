import type { Request, Response } from 'express';
import { config } from '../config/env.validation.js';

// ACCESS TOKEN
const SaveAccessTokenInCookie = (res: Response, token: string): void => {
  res.cookie('access_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: config.cookie.sameSite,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

const ClearAccessTokenCookie = (res: Response): void => {
  res.clearCookie('access_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: config.cookie.sameSite,
  });
};

const GetAccessTokenFromCookie = (req: Request): string | null => {
  return req.cookies?.access_token || null;
};

// REFRESH TOKEN
const SaveRefreshTokenInCookie = (res: Response, token: string): void => {
  res.cookie('refresh_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: config.cookie.sameSite,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

const ClearRefreshTokenCookie = (res: Response): void => {
  res.clearCookie('refresh_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: config.cookie.sameSite,
  });
};

const GetRefreshTokenFromCookie = (req: Request): string | null => {
  return req.cookies?.refresh_token || null;
};

export {
  SaveAccessTokenInCookie,
  ClearAccessTokenCookie,
  GetAccessTokenFromCookie,
  SaveRefreshTokenInCookie,
  ClearRefreshTokenCookie,
  GetRefreshTokenFromCookie,
};
