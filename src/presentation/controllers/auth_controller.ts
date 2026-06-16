import { inject, injectable } from 'tsyringe';
import type { Request, Response } from 'express';
import type { IAuthController } from '../../domain/controller/auth_controller_interface.js';
import { CustomError } from '../../shared/error/customErrorHandler.js';
import { ERROR_MESSAGES, HTTP_STATUS_CODE, SUCCESS_MESSAGES } from '../../shared/types/constants/constants.js';
import { registrationValidationSchema } from '../validations/auth/registeration_validation_schema.js';
import type { ISendOtpEmailUseCase } from '../../domain/usecases/auth/send_email_usecase_interface.js';
import type { IVerifyOtpUseCase } from '../../domain/usecases/auth/verify_otp_interface.js';
import type { IRegisterUserUseCase } from '../../domain/usecases/auth/register_usecase_interface.js';
import { loginValidationSchema } from '../validations/auth/login_validation_schema.js';
import {
  generateJwtToken,
  verifyJwtToken,
} from '../../shared/utils/jwt_token_utils.js';
import {
  ClearAccessTokenCookie,
  ClearRefreshTokenCookie,
  SaveAccessTokenInCookie,
  SaveRefreshTokenInCookie,
} from '../../shared/utils/cookie_helper.js';
import type { ILoginUserUseCase } from '../../domain/usecases/auth/login_usecase_interface.js';
import { config } from '../../shared/config/env.validation.js';

@injectable()
export class AuthController implements IAuthController {
  constructor(
    @inject('ISendOtpEmailUseCase')
    private _sendOtpEmailUseCase: ISendOtpEmailUseCase,

    @inject('IVerifyOtpUseCase')
    private _verifyOtpUseCase: IVerifyOtpUseCase,
    @inject('IRegisterUserUseCase')
    private _registerUserUseCase: IRegisterUserUseCase,
    @inject('ILoginUserUseCase')
    private _loginUserUseCase: ILoginUserUseCase,
  ) { }

  async sendOtpEmail(req: Request, res: Response): Promise<void> {
    const { email } = req.body;
    if (!email.trim()) {
      throw new CustomError(ERROR_MESSAGES.EMAIL_REQUIRED, HTTP_STATUS_CODE.BAD_REQUEST);
    }

    await this._sendOtpEmailUseCase.execute({ email });
    res.status(HTTP_STATUS_CODE.OK).json({ message: SUCCESS_MESSAGES.OTP_SENT });
  }

  async verifyOtp(req: Request, res: Response): Promise<void> {
    const { email, otp } = req.body;
    if (!email.trim() || !otp.trim()) {
      throw new CustomError(ERROR_MESSAGES.EMAIL_AND_OTP_REQUIRED, HTTP_STATUS_CODE.BAD_REQUEST);
    }
    const response = await this._verifyOtpUseCase.execute({ email, otp });

    if (response.verified) {
      res.status(HTTP_STATUS_CODE.OK).json({ success: true, message: SUCCESS_MESSAGES.OTP_VERIFIED });
    } else {
      throw new CustomError(ERROR_MESSAGES.INVALID_OTP, HTTP_STATUS_CODE.BAD_REQUEST);
    }
  }

  async registerUser(req: Request, res: Response): Promise<void> {
    const validatedData = registrationValidationSchema.parse(req.body);

    await this._registerUserUseCase.execute(validatedData);

    res.status(HTTP_STATUS_CODE.CREATED).json({
      success: true,
      message: SUCCESS_MESSAGES.USER_REGISTERED,
    });
  }

  async loginUser(req: Request, res: Response): Promise<void> {
    const validatedData = loginValidationSchema.parse(req.body);

    const user = await this._loginUserUseCase.execute(validatedData);

    const accessToken = generateJwtToken(
      {
        userId: user.userId,
        userUUID: user.userUUID,
        email: user.email,
        name: user.name,
        role: 'user',
      },
      config.jwt.accessTokenSecret!,
      config.jwt.accessTokenExpiresIn, 
    );
    const refreshToken = generateJwtToken(
      {
        userId: user.userId,
        userUUID: user.userUUID,
        email: user.email,
        name: user.name,
        role: 'user',
      },
      config.jwt.refreshTokenSecret!,
      config.jwt.refreshTokenExpiresIn,
    );
    SaveAccessTokenInCookie(res, accessToken);
    SaveRefreshTokenInCookie(res, refreshToken);

    const dataToSend = {
      name: user.name,
      userUUID: user.userUUID,
      email: user.email,
    }

    res.status(HTTP_STATUS_CODE.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.USER_LOGGED_IN,
      data: dataToSend,
    });
  }

  async refreshToken(req: Request, res: Response): Promise<void> {
    const refreshToken = req.cookies['refresh_token'];

    if (!refreshToken) {
      ClearAccessTokenCookie(res);
      ClearRefreshTokenCookie(res);
      throw new CustomError(ERROR_MESSAGES.REFRESH_TOKEN_MISSING, HTTP_STATUS_CODE.UNAUTHORIZED);
    }

    const decoded = verifyJwtToken(
      refreshToken,
      config.jwt.refreshTokenSecret!,
    );


    if (decoded === null) {
      ClearAccessTokenCookie(res);
      ClearRefreshTokenCookie(res);
      throw new CustomError(ERROR_MESSAGES.INVALID_REFRESH_TOKEN, HTTP_STATUS_CODE.UNAUTHORIZED)
    }

    const newAccessToken = generateJwtToken(
      {
        userId: decoded.userId,
        userUUID: decoded.userUUID,
        email: decoded.email,
        name: decoded.name,
        role: decoded.role,
      },
      config.jwt.accessTokenSecret!,
      config.jwt.accessTokenExpiresIn,
    );

    const newRefreshToken = generateJwtToken(
      {
        userId: decoded.userId,
        userUUID: decoded.userUUID,
        email: decoded.email,
        name: decoded.name,
        role: decoded.role,
      },
      config.jwt.refreshTokenSecret!,
      config.jwt.refreshTokenExpiresIn,
    );

    SaveAccessTokenInCookie(res, newAccessToken);
    SaveRefreshTokenInCookie(res, newRefreshToken);

    res.status(HTTP_STATUS_CODE.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.TOKEN_REFRESHED,
    });
  }

  async logoutUser(req: Request, res: Response): Promise<void> {
    ClearAccessTokenCookie(res);
    ClearRefreshTokenCookie(res);

    res.status(HTTP_STATUS_CODE.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.USER_LOGGED_OUT,
    });
  }
}
