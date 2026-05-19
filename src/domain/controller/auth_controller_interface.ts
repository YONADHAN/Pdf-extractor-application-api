import type { Request, Response } from 'express';

export interface IAuthController {
  sendOtpEmail(req: Request, res: Response): Promise<void>;
  verifyOtp(req: Request, res: Response): Promise<void>;
  registerUser(req: Request, res: Response): Promise<void>;
  loginUser(req: Request, res: Response): Promise<void>;
  refreshToken(req: Request, res: Response): Promise<void>;
  logoutUser(req: Request, res: Response): Promise<void>;
}
