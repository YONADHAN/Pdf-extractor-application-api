import mongoose, { model, Document, Types } from 'mongoose';
import { CounterSchema } from '../schemas/counter_schema.js';
import type { CounterMongoBase } from '../types/counter_mongo_base.js';

export interface ICounterModel extends CounterMongoBase, Document {
  _id: Types.ObjectId;
}
export const CounterModel = mongoose.models.Counter || model<ICounterModel>('Counter', CounterSchema);
