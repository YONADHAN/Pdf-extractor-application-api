export interface IVerifyOtpUseCaseRequestDTO {
  otp: string;
  email: string;
}

export interface IVerifyOtpUseCaseResponseDTO {
  verified: boolean;
}
