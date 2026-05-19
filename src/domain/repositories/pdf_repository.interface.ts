import type { IPdfDocumentModel } from '../../infrastructure/database/mongo/models/pdf_model.js';
import type { IPdfDocumentEntity } from '../models/pdf_entity.js';
import type { IBaseRepository } from './base_repository.interface.js';
import type { PdfDocumentType } from '../../shared/types/constants/enum.js';
export interface IPdfRepository extends IBaseRepository<
  IPdfDocumentModel,
  IPdfDocumentEntity
> {
  listAllPdfs(
    userId: string,
    type: PdfDocumentType,
    page: number,
    limit: number,
  ): Promise<{
    data: IPdfDocumentEntity[];
    total: number;
    page: number;
    limit: number;
  }>;
}
