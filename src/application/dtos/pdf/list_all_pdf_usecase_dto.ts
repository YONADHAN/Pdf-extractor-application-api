import type { PdfDocumentType } from '../../../shared/types/constants/enum.js';

export interface ListAllPdfUseCaseRequestDTO {
  userId: string;

  type: PdfDocumentType;

  page: number;

  limit: number;
}

export interface ListAllPdfItemDTO {
  id: string;

  original_file_name: string;

  stored_file_name: string;

  type: PdfDocumentType;

  total_pages: number;

  url: string;

  createdAt: Date;
}

export interface ListAllPdfUseCaseResponseDTO {
  data: ListAllPdfItemDTO[];

  total: number;

  page: number;

  limit: number;

  totalPages: number;
}
