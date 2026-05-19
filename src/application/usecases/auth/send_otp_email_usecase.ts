import { inject, injectable } from 'tsyringe';
import {
  HTTP_STATUS,
  ERROR_MESSAGES,
} from '../../../shared/types/constants/constants.js';

import { CustomError } from '../../../shared/error/customErrorHandler.js';
import type { ISendOtpEmailUseCase } from '../../../domain/usecases/auth/send_email_usecase_interface.js';
import type { IEmailService } from '../../../domain/services/email_service.interface.js';
import type { IOtpRepository } from '../../../domain/repositories/otp_repository.iterface.js';
import type { ISendOtpEmailUseCaseRequestDTO } from '../../dtos/auth/send_otp_email_usecase_dto.js';

@injectable()
export class SendOtpEmailUseCase implements ISendOtpEmailUseCase {
  constructor(
    @inject('IEmailService')
    private _emailService: IEmailService,
    @inject('IOtpRepository')
    private _otpRepository: IOtpRepository,
  ) {}
  async execute(data: ISendOtpEmailUseCaseRequestDTO): Promise<void> {
    const { email } = data;
    if (!email.trim()) {
      throw new CustomError(
        ERROR_MESSAGES.EMAIL_REQUIRED,
        HTTP_STATUS.BAD_REQUEST,
      );
    }

    const otpCooldown = 2 * 60 * 1000;

    const latestOtp = await this._otpRepository.findLatestOtp(email.toLowerCase());

    if (latestOtp) {
      const now = Date.now();

      const expiresAt = new Date(latestOtp.expiresAt).getTime();

      if (expiresAt > now) {
        throw new CustomError(
          ERROR_MESSAGES.OTP_ALREADY_SENT,
          HTTP_STATUS.TOO_MANY_REQUESTS,
        );
      }
    }

    const otp = await this._emailService.generateOtp();

    await this._otpRepository.create({
      email: email.toLowerCase(),
      otp,
      expiresAt: new Date(Date.now() + otpCooldown),
    });

    await this._emailService.sendOtpEmail(email, 'Your OTP Code', otp);
  }
}
