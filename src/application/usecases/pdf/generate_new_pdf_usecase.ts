import axios from 'axios';

import { PDFDocument } from 'pdf-lib';

import { inject, injectable } from 'tsyringe';

import { PdfDocumentType } from '../../../shared/types/constants/enum.js';

import {
  CounterRepositoryKey,
  HTTP_STATUS,
} from '../../../shared/types/constants/constants.js';

import { CustomError } from '../../../shared/error/customErrorHandler.js';
import type { IPdfRepository } from '../../../domain/repositories/pdf_repository.interface.js';
import type { ICounterRepository } from '../../../domain/repositories/counter_repository.interface.js';
import type { ICloudinaryFileStorageService } from '../../../domain/services/cloudinary_file_storage_service.interface.js';

import type { IGenerateNewPdfUseCase } from '../../../domain/usecases/pdf/generate_new_pdf_usecase_interface.js';
import type {
  GenerateNewPdfUseCaseRequestDTO,
  GenerateNewPdfUseCaseResponseDTO,
} from '../../dtos/pdf/generate_new_pdf_usecase_dto.js';
import { mapGenerateNewPdfResponse } from '../../mapper/pdf/generate_new_pdf_response_mapper.js';

@injectable()
export class GenerateNewPdfUseCase implements IGenerateNewPdfUseCase {
  constructor(
    @inject('IPdfRepository')
    private _pdfRepository: IPdfRepository,

    @inject('ICounterRepository')
    private _counterRepository: ICounterRepository,

    @inject('ICloudinaryFileStorageService')
    private _cloudinaryService: ICloudinaryFileStorageService,
  ) {}

  async execute({
    userId,
    stored_file_name,
    pages,
  }: GenerateNewPdfUseCaseRequestDTO): Promise<GenerateNewPdfUseCaseResponseDTO> {
    const existingPdf = await this._pdfRepository.findOne({
      stored_file_name,

      userId,
    });

    if (!existingPdf) {
      throw new CustomError('PDF not found', HTTP_STATUS.NOT_FOUND);
    }

    const response = await axios.get(existingPdf.url, {
      responseType: 'arraybuffer',
    });

    const originalPdfBuffer = Buffer.from(response.data);

    const originalPdf = await PDFDocument.load(originalPdfBuffer);

    const totalPages = originalPdf.getPageCount();

    const invalidPages = pages.some((page) => page > totalPages || page <= 0);

    if (invalidPages) {
      throw new CustomError('Invalid page selected', HTTP_STATUS.BAD_REQUEST);
    }

    const newPdf = await PDFDocument.create();

    const zeroBasedPages = pages.map((page) => page - 1);

    const copiedPages = await newPdf.copyPages(originalPdf, zeroBasedPages);

    copiedPages.forEach((page) => {
      newPdf.addPage(page);
    });

    const newPdfBuffer = Buffer.from(await newPdf.save());

    const storedFileName = await this._counterRepository.createNextUniqueId(
      CounterRepositoryKey.PDF,
    );

    const uploadedPdf = await this._cloudinaryService.uploadFile({
      buffer: newPdfBuffer,

      folder_name: 'generated-pdfs',

      file_name: storedFileName,
    });

    if (!existingPdf._id) {
      throw new CustomError(
        'Parent PDF id missing',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
      );
    }

    const createdPdf = await this._pdfRepository.create({
      userId,

      original_file_name: existingPdf.original_file_name,

      stored_file_name: storedFileName,

      type: PdfDocumentType.EXTRACTED,

      parent_document_id: existingPdf._id,

      pages_included: pages,

      total_pages: pages.length,

      url: uploadedPdf.url,

      public_id: uploadedPdf.public_id,

      size_in_bytes: newPdfBuffer.length,

      mime_type: 'application/pdf',
    });

    return mapGenerateNewPdfResponse(createdPdf);
  }
}
