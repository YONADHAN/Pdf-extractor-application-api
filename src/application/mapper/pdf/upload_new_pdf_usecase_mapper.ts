import type { IPdfDocumentEntity } from '../../../domain/models/pdf_entity.js';

import type { UploadNewPdfUseCaseResponseDTO } from '../../dtos/pdf/upload_new_pdf_usecase_dto.js';

export function mapUploadNewPdfResponse(
  pdf: IPdfDocumentEntity,
): UploadNewPdfUseCaseResponseDTO {
  return {
    id: pdf._id!,

    original_file_name: pdf.original_file_name,

    stored_file_name: pdf.stored_file_name,

    type: pdf.type,

    total_pages: pdf.total_pages,

    url: pdf.url,

    createdAt: pdf.createdAt,
  };
}
