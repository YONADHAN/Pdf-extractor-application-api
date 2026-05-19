import type {
  ViewSinglePdfUseCaseRequestDTO,
  ViewSinglePdfUseCaseResponseDTO,
} from '../../../application/dtos/pdf/view_single_pdf_usecase_dto.js';

export interface IViewSinglePdfUseCase {
  execute(
    data: ViewSinglePdfUseCaseRequestDTO,
  ): Promise<ViewSinglePdfUseCaseResponseDTO>;
}
