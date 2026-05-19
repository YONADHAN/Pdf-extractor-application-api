import { Schema } from 'mongoose';
import type { IUserModel } from '../models/user_model.js';
import { Role } from '../../../../shared/types/constants/enum.js';
export const UserSchema = new Schema<IUserModel>(
  {
    userUUID: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.USER,
    },
  },
  {
    timestamps: true,
  },
);
