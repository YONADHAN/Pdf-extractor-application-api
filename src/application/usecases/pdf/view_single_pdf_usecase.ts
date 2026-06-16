import { inject, injectable } from 'tsyringe';

import type { IPdfRepository } from '../../../domain/repositories/pdf_repository.interface.js';

import { ERROR_MESSAGES, HTTP_STATUS_CODE } from '../../../shared/types/constants/constants.js';

import { CustomError } from '../../../shared/error/customErrorHandler.js';
import type { IViewSinglePdfUseCase } from '../../../domain/usecases/pdf/view_single_pdf_usecase_interface.js';
import { mapViewSinglePdfResponse } from '../../mapper/pdf/view_single_pdf_response_mapper.js';
import type {
  ViewSinglePdfUseCaseRequestDTO,
  ViewSinglePdfUseCaseResponseDTO,
} from '../../dtos/pdf/view_single_pdf_usecase_dto.js';

@injectable()
export class ViewSinglePdfUseCase implements IViewSinglePdfUseCase {
  constructor(
    @inject('IPdfRepository')
    private _pdfRepository: IPdfRepository,
  ) {}

  async execute({
    userId,
    stored_file_name,
  }: ViewSinglePdfUseCaseRequestDTO): Promise<ViewSinglePdfUseCaseResponseDTO> {
    const pdf = await this._pdfRepository.findOne({
      userId,

      stored_file_name,
    });

    if (!pdf) {
      throw new CustomError(ERROR_MESSAGES.PDF_NOT_FOUND, HTTP_STATUS_CODE.NOT_FOUND);
    }

    return mapViewSinglePdfResponse(pdf);
  }
}
