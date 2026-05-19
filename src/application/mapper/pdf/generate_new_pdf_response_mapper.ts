import type { GenerateNewPdfUseCaseResponseDTO } from '../../dtos/pdf/generate_new_pdf_usecase_dto.js';

import type { IPdfDocumentEntity } from '../../../domain/models/pdf_entity.js';

export function mapGenerateNewPdfResponse(
  pdf: IPdfDocumentEntity,
): GenerateNewPdfUseCaseResponseDTO {
  return {
    id: pdf._id!,

    original_file_name: pdf.original_file_name,

    stored_file_name: pdf.stored_file_name,

    type: pdf.type,

    total_pages: pdf.total_pages,

    ...(pdf.pages_included && {
      pages_included: pdf.pages_included,
    }),

    url: pdf.url,

    createdAt: pdf.createdAt,
  };
}
