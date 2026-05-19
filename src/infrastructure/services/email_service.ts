import { injectable } from 'tsyringe';
import { config } from '../../shared/config/env.validation.js';
import nodemailer from 'nodemailer';
import chalk from 'chalk';
import type { IEmailService } from '../../domain/services/email_service.interface.js';
import { APP_NAME } from '../../shared/types/constants/constants.js';
import { VERIFICATION_MAIL_CONTENT } from '../../shared/types/constants/mail_content.js';

@injectable()
export class EmailService implements IEmailService {
  private _transporter;

  constructor() {
    this._transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.nodemailer.email,
        pass: config.nodemailer.password,
      },
    });
  }

  private async _sendMail(mailOptions: {
    from: string;
    to: string;
    subject: string;
    html: string;
  }) {
    const info = await this._transporter.sendMail(mailOptions);
    console.log(chalk.bgGreenBright.bold(`📧Email Sent:`), info.response);
  }

  async sendOtpEmail(to: string, subject: string, otp: string): Promise<void> {
    const mailOptions = {
      from: `"${APP_NAME}" <${config.nodemailer.email}>`,
      to,
      subject,
      html: VERIFICATION_MAIL_CONTENT(otp),
    };
    await this._sendMail(mailOptions);
  }

  async generateOtp(): Promise<string> {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return otp;
  }
}
