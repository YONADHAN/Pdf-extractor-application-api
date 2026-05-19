import type { PdfDocumentType } from '../../../shared/types/constants/enum.js';

export interface ViewSinglePdfUseCaseRequestDTO {
  userId: string;

  stored_file_name: string;
}

export interface ViewSinglePdfUseCaseResponseDTO {
  id: string;

  original_file_name: string;

  stored_file_name: string;

  type: PdfDocumentType;

  total_pages: number;

  pages_included?: number[];

  url: string;

  createdAt: Date;
}
