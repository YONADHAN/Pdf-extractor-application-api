import type {
  IVerifyOtpUseCaseRequestDTO,
  IVerifyOtpUseCaseResponseDTO,
} from '../../../application/dtos/auth/verify_otp_usecase_dto.js';

export interface IVerifyOtpUseCase {
  execute(
    data: IVerifyOtpUseCaseRequestDTO,
  ): Promise<IVerifyOtpUseCaseResponseDTO>;
}
