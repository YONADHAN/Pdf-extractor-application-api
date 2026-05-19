import mongoose,{ model, Document, Types } from 'mongoose';
import type { UserMongoBase } from '../types/user_mongo_base.js';
import { UserSchema } from '../schemas/user_schema.js';

export interface IUserModel extends UserMongoBase, Document {
  _id: Types.ObjectId;
}

export const UserModel = mongoose.models.User || model<IUserModel>('User', UserSchema);
