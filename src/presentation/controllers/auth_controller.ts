import { inject, injectable } from 'tsyringe';
import type { Request, Response } from 'express';
import type { IAuthController } from '../../domain/controller/auth_controller_interface.js';
import { CustomError } from '../../shared/error/customErrorHandler.js';
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
  ) {}

  async sendOtpEmail(req: Request, res: Response): Promise<void> {
    const { email } = req.body;
    if (!email.trim()) {
      throw new CustomError('Email is required', 400);
    }

    await this._sendOtpEmailUseCase.execute({email});
    res.status(200).json({ message: 'OTP sent successfully' });
  }

  async verifyOtp(req: Request, res: Response): Promise<void> {
    const { email, otp } = req.body;
    if (!email.trim() || !otp.trim()) {
      throw new CustomError('Email and OTP are required', 400);
    }
    const response = await this._verifyOtpUseCase.execute({ email, otp });

    if (response.verified) {
      res.status(200).json({ success: true, message: 'OTP verified successfully' });
    } else {
      throw new CustomError('Invalid OTP', 400);
    }
  }

  async registerUser(req: Request, res: Response): Promise<void> {
    const validatedData = registrationValidationSchema.parse(req.body);

    await this._registerUserUseCase.execute(validatedData);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
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
      config.jwt.accessTokenExpiresIn, //'15m'
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

    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      data: dataToSend,
    });
  }

  async refreshToken(req: Request, res: Response): Promise<void> {
    const refreshToken = req.cookies['refresh_token'];

    if (!refreshToken) {
      throw new CustomError('Refresh token missing', 401);
    }

    const decoded = verifyJwtToken(
      refreshToken,
      config.jwt.refreshTokenSecret!,
    );

    if (typeof decoded === 'string') {
      throw new CustomError('Invalid refresh token', 401);
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
      config.jwt.accessTokenSecret!,
      config.jwt.accessTokenExpiresIn,
    );

    SaveAccessTokenInCookie(res, newAccessToken);
    SaveRefreshTokenInCookie(res, newRefreshToken);

    res.status(200).json({
      success: true,
      message: 'Token refreshed successfully',
    });
  }

  async logoutUser(req: Request, res: Response): Promise<void> {
    ClearAccessTokenCookie(res);
    ClearRefreshTokenCookie(res);

    res.status(200).json({
      success: true,
      message: 'User logged out successfully',
    });
  }
}
