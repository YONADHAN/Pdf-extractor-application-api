import type { PdfDocumentType } from '../../../shared/types/constants/enum.js';

export interface UploadNewPdfUseCaseRequestDTO {
  file: Express.Multer.File;

  userId: string;
}

export interface UploadNewPdfUseCaseResponseDTO {
  id: string;

  original_file_name: string;

  stored_file_name: string;

  type: PdfDocumentType;

  total_pages: number;

  url: string;

  createdAt: Date;
}
