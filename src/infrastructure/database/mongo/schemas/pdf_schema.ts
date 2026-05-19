import { Schema } from 'mongoose';
import { PdfDocumentType } from '../../../../shared/types/constants/enum.js';
import type { IPdfDocumentModel } from '../models/pdf_model.js';
export const pdfDocumentSchema = new Schema<IPdfDocumentModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    original_file_name: {
      type: String,
      required: true,
    },

    stored_file_name: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: Object.values(PdfDocumentType),
      required: true,
    },

    parent_document_id: {
      type: Schema.Types.ObjectId,
      ref: 'PdfDocument',
      default: null,
    },

    pages_included: {
      type: [Number],
      default: undefined,
    },

    total_pages: {
      type: Number,
      required: true,
    },

    url: {
      type: String,
      required: true,
    },

    public_id: {
      type: String,
      required: true,
    },

    size_in_bytes: {
      type: Number,
      required: true,
    },

    mime_type: {
      type: String,
      default: 'application/pdf',
    },
  },
  {
    timestamps: true,
  },
);
