import mongoose, {model, Document, Types} from 'mongoose';
import { VerifiedEmailSchema } from '../schemas/verified_email_schema.js';
import type { VerifiedEmailMongoBase } from '../types/verified_email_mongo_base.js';

export interface IVerifiedEmailModel extends VerifiedEmailMongoBase, Document {
    _id: Types.ObjectId;
}
export const VerifiedEmailModel = mongoose.models.VerifiedEmail || model<IVerifiedEmailModel>('VerifiedEmail',VerifiedEmailSchema);