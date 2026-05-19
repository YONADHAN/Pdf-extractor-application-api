import { inject, injectable } from 'tsyringe';

import { PDFDocument } from 'pdf-lib';

import type { IUploadNewPdfUseCase } from '../../../domain/usecases/pdf/upload_new_pdf_usecase_interface.js';

import type { IPdfRepository } from '../../../domain/repositories/pdf_repository.interface.js';

import type { ICloudinaryFileStorageService } from '../../../domain/services/cloudinary_file_storage_service.interface.js';

import type { ICounterRepository } from '../../../domain/repositories/counter_repository.interface.js';

import { CounterRepositoryKey } from '../../../shared/types/constants/constants.js';

import { PdfDocumentType } from '../../../shared/types/constants/enum.js';
import type {
  UploadNewPdfUseCaseRequestDTO,
  UploadNewPdfUseCaseResponseDTO,
} from '../../dtos/pdf/upload_new_pdf_usecase_dto.js';
import { mapUploadNewPdfResponse } from '../../mapper/pdf/upload_new_pdf_usecase_mapper.js';

@injectable()
export class UploadNewPdfUseCase implements IUploadNewPdfUseCase {
  constructor(
    @inject('IPdfRepository')
    private _pdfRepository: IPdfRepository,

    @inject('ICloudinaryFileStorageService')
    private _cloudinaryService: ICloudinaryFileStorageService,

    @inject('ICounterRepository')
    private _counterRepository: ICounterRepository,
  ) {}

  async execute({
    file,
    userId,
  }: UploadNewPdfUseCaseRequestDTO): Promise<UploadNewPdfUseCaseResponseDTO> {
    const storedFileName = await this._counterRepository.createNextUniqueId(
      CounterRepositoryKey.PDF,
    );

    const uploadedPdf = await this._cloudinaryService.uploadFile({
      buffer: file.buffer,

      folder_name: 'pdfs',

      file_name: storedFileName,
    });

    const pdfDocument = await PDFDocument.load(file.buffer);

    const totalPages = pdfDocument.getPageCount();

    const dataToSave = {
      userId,

      original_file_name: file.originalname,

      stored_file_name: storedFileName,

      type: PdfDocumentType.ORIGINAL,

      total_pages: totalPages,

      url: uploadedPdf.url,

      public_id: uploadedPdf.public_id,

      size_in_bytes: file.size,

      mime_type: file.mimetype,
    };

    const createdPdf = await this._pdfRepository.create(dataToSave);

    return mapUploadNewPdfResponse(createdPdf);
  }
}
