import { inject, injectable } from 'tsyringe';

import type { IPdfRepository } from '../../../domain/repositories/pdf_repository.interface.js';

import type { ICloudinaryFileStorageService } from '../../../domain/services/cloudinary_file_storage_service.interface.js';

import { ERROR_MESSAGES, HTTP_STATUS_CODE } from '../../../shared/types/constants/constants.js';

import { CustomError } from '../../../shared/error/customErrorHandler.js';
import type { IDeletePdfUseCase } from '../../../domain/usecases/pdf/delete_pdf_usecase_interface.js';
import type { DeletePdfUseCaseRequestDTO } from '../../dtos/pdf/delete_pdf_usecase_dto.js';

@injectable()
export class DeletePdfUseCase implements IDeletePdfUseCase {
  constructor(
    @inject('IPdfRepository')
    private _pdfRepository: IPdfRepository,

    @inject('ICloudinaryFileStorageService')
    private _cloudinaryService: ICloudinaryFileStorageService,
  ) {}

  async execute({
    userId,
    stored_file_name,
  }: DeletePdfUseCaseRequestDTO): Promise<void> {
    const existingPdf = await this._pdfRepository.findOne({
      userId,

      stored_file_name,
    });

    if (!existingPdf) {
      throw new CustomError(ERROR_MESSAGES.PDF_NOT_FOUND, HTTP_STATUS_CODE.NOT_FOUND);
    }

    //delete from cloudinary

    await this._cloudinaryService.deleteFile(existingPdf.public_id);

    if (!existingPdf._id) {
      throw new CustomError(
        ERROR_MESSAGES.PDF_ID_MISSING,
        HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      );
    }

    await this._pdfRepository.delete({ _id: existingPdf._id });
  }
}
