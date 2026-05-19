import mongoose, { model, Document,  Types } from 'mongoose';
import { pdfDocumentSchema } from '../schemas/pdf_schema.js';
import type { PdfDocumentBase } from '../types/pdf_mongo_base.js';

export interface IPdfDocumentModel extends PdfDocumentBase, Document {
  _id: Types.ObjectId;
}

export const PdfDocumentModel =
  mongoose.models.PdfDocument ||
  model<IPdfDocumentModel>('PdfDocument', pdfDocumentSchema);
