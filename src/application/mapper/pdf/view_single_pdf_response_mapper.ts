import type { IPdfDocumentEntity } from '../../../domain/models/pdf_entity.js';

import type { ViewSinglePdfUseCaseResponseDTO } from '../../dtos/pdf/view_single_pdf_usecase_dto.js';

export function mapViewSinglePdfResponse(
  pdf: IPdfDocumentEntity,
): ViewSinglePdfUseCaseResponseDTO {
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
