export interface IEmailService {
  sendOtpEmail(to: string, subject: string, otp: string): Promise<void>;
  generateOtp(): Promise<string>;
}
