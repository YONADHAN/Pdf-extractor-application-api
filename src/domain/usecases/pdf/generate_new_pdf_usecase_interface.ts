import type {
  GenerateNewPdfUseCaseRequestDTO,
  GenerateNewPdfUseCaseResponseDTO,
} from '../../../application/dtos/pdf/generate_new_pdf_usecase_dto.js';

export interface IGenerateNewPdfUseCase {
  execute({
    userId,
    stored_file_name,
    pages,
  }: GenerateNewPdfUseCaseRequestDTO): Promise<GenerateNewPdfUseCaseResponseDTO>;
}
