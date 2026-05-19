import type { DeletePdfUseCaseRequestDTO } from '../../../application/dtos/pdf/delete_pdf_usecase_dto.js';

export interface IDeletePdfUseCase {
  execute(data: DeletePdfUseCaseRequestDTO): Promise<void>;
}
