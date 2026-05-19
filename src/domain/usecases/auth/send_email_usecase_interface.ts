import type { ISendOtpEmailUseCaseRequestDTO } from '../../../application/dtos/auth/send_otp_email_usecase_dto.js';

export interface ISendOtpEmailUseCase {
  execute(data: ISendOtpEmailUseCaseRequestDTO): Promise<void>;
}
