import type {
  UploadNewPdfUseCaseRequestDTO,
  UploadNewPdfUseCaseResponseDTO,
} from '../../../application/dtos/pdf/upload_new_pdf_usecase_dto.js';

export interface IUploadNewPdfUseCase {
  execute(
    data: UploadNewPdfUseCaseRequestDTO,
  ): Promise<UploadNewPdfUseCaseResponseDTO>;
}
