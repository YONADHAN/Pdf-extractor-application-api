import mongoose, {
  model,
  Document,
  Types
} from 'mongoose';

import type {
  OtpMongoBase
} from '../types/otp_mongo_base.js';

import {
  OtpSchema
} from '../schemas/otp_schema.js';

export interface IOtpModel
  extends OtpMongoBase,
    Document {

  _id: Types.ObjectId;
}

export const OtpModel =

  mongoose.models.Otp ||

  model<IOtpModel>(
    'Otp',
    OtpSchema
  );