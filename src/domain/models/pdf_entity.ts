import type { PdfDocumentType } from '../../shared/types/constants/enum.js';

export interface IPdfDocumentEntity {
  _id?: string;
  userId: string;
  original_file_name: string;
  stored_file_name: string;
  type: PdfDocumentType;
  parent_document_id?: string;
  pages_included?: number[];
  total_pages: number;
  url: string;
  public_id: string;
  size_in_bytes: number;
  mime_type: string;
  createdAt: Date;
  updatedAt: Date;
}
