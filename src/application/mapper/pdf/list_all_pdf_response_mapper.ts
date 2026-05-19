import type { IPdfDocumentEntity } from '../../../domain/models/pdf_entity.js';

import type {
  ListAllPdfItemDTO,
  ListAllPdfUseCaseResponseDTO,
} from '../../dtos/pdf/list_all_pdf_usecase_dto.js';

function mapPdfItem(pdf: IPdfDocumentEntity): ListAllPdfItemDTO {
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

export function mapListAllPdfResponse(data: {
  data: IPdfDocumentEntity[];

  total: number;

  page: number;

  limit: number;
}): ListAllPdfUseCaseResponseDTO {
  return {
    data: data.data.map(mapPdfItem),

    total: data.total,

    page: data.page,

    limit: data.limit,

    totalPages: Math.ceil(data.total / data.limit),
  };
}
