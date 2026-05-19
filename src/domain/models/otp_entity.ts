export interface IOtpEntity {
  _id?: string;
  email: string;
  otp: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
