import { inject, injectable } from 'tsyringe';

import type { IPdfRepository } from '../../../domain/repositories/pdf_repository.interface.js';
import type { IPdfDocumentEntity } from '../../../domain/models/pdf_entity.js';
import type { IListAllPdfUseCase } from '../../../domain/usecases/pdf/list_all_pdf_usecase_interface.js';
import type {
  ListAllPdfUseCaseRequestDTO,
  ListAllPdfUseCaseResponseDTO,
} from '../../dtos/pdf/list_all_pdf_usecase_dto.js';
import { mapListAllPdfResponse } from '../../mapper/pdf/list_all_pdf_response_mapper.js';

@injectable()
export class ListAllPdfUseCase implements IListAllPdfUseCase {
  constructor(
    @inject('IPdfRepository')
    private readonly _pdfRepository: IPdfRepository,
  ) {}

  async execute({
    userId,
    type,
    page,
    limit,
  }: ListAllPdfUseCaseRequestDTO): Promise<ListAllPdfUseCaseResponseDTO> {
    const pdfs = await this._pdfRepository.listAllPdfs(
      userId,
      type,
      page,
      limit,
    );
    return mapListAllPdfResponse(pdfs);
  }
}
