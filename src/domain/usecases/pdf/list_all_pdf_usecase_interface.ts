import type {
  ListAllPdfUseCaseRequestDTO,
  ListAllPdfUseCaseResponseDTO,
} from '../../../application/dtos/pdf/list_all_pdf_usecase_dto.js';

export interface IListAllPdfUseCase {
  execute({
    userId,
    type,
    page,
    limit,
  }: ListAllPdfUseCaseRequestDTO): Promise<ListAllPdfUseCaseResponseDTO>;
}
