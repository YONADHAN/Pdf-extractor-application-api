import { inject, injectable } from 'tsyringe';
import { CustomError } from '../../../shared/error/customErrorHandler.js';
import {
  ERROR_MESSAGES,
  HTTP_STATUS,
} from '../../../shared/types/constants/constants.js';
import type { IOtpRepository } from '../../../domain/repositories/otp_repository.iterface.js';
import type { IVerifyOtpUseCase } from '../../../domain/usecases/auth/verify_otp_interface.js';
import type {
  IVerifyOtpUseCaseRequestDTO,
  IVerifyOtpUseCaseResponseDTO,
} from '../../dtos/auth/verify_otp_usecase_dto.js';

@injectable()
export class VerifyOtpUseCase implements IVerifyOtpUseCase {
  constructor(
    @inject('IOtpRepository')
    private _otpRepository: IOtpRepository,
  ) {}

  async execute({
    otp,
    email,
  }: IVerifyOtpUseCaseRequestDTO): Promise<IVerifyOtpUseCaseResponseDTO> {
    if (!otp.trim() || !email.trim()) {
      throw new CustomError(
        ERROR_MESSAGES.CREDENTIALS_NOT_SEND,
        HTTP_STATUS.BAD_REQUEST,
      );
    }

    const latestOtp = await this._otpRepository.findLatestOtp(email);

    if (!latestOtp) {
      throw new CustomError(ERROR_MESSAGES.OTP_ABSENT, HTTP_STATUS.NOT_FOUND);
    }

    const now = Date.now();

    const expiresAt = new Date(latestOtp.expiresAt).getTime();

    if (now > expiresAt) {
      throw new CustomError(ERROR_MESSAGES.OTP_EXPIRED, HTTP_STATUS.GONE);
    }

    if (latestOtp.otp !== otp) {
      throw new CustomError(ERROR_MESSAGES.OTP_NOT_MATCH, HTTP_STATUS.CONFLICT);
    }

    return {
      verified: true,
    };
  }
}
