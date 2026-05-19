import { Schema } from 'mongoose';
import type { IOtpModel } from '../models/otp_model.js';

export const OtpSchema = new Schema<IOtpModel>(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
