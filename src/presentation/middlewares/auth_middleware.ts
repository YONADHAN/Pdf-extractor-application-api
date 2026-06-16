import type { Request, Response, NextFunction } from 'express';
import { injectable } from 'tsyringe';

import { CustomError } from '../../shared/error/customErrorHandler.js';
import { verifyJwtToken } from '../../shared/utils/jwt_token_utils.js';
import { GetAccessTokenFromCookie } from '../../shared/utils/cookie_helper.js';
import { config } from '../../shared/config/env.validation.js';
import {
  ERROR_MESSAGES,
  HTTP_STATUS_CODE,
} from '../../shared/types/constants/constants.js';

@injectable()
export class AuthMiddleware {
  async authenticate(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const access_token = GetAccessTokenFromCookie(req);

    if (!access_token) {
      throw new CustomError(
        ERROR_MESSAGES.ACCESS_TOKEN_NOT_FOUND,
        HTTP_STATUS_CODE.UNAUTHORIZED,
      );
    }

    const decodedAccessToken = verifyJwtToken(
      access_token,
      config.jwt.accessTokenSecret,
    );

    if (!decodedAccessToken) {
      throw new CustomError(
        ERROR_MESSAGES.INVALID_ACCESS_TOKEN,
        HTTP_STATUS_CODE.FORBIDDEN,
      );
    }

    req.user = decodedAccessToken;

    next();
  }
}
