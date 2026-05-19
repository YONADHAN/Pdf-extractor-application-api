import type { IPdfRepository } from '../../domain/repositories/pdf_repository.interface.js';
import { BaseRepository } from './base_repository.js';
import { injectable } from 'tsyringe';
import {
  PdfDocumentModel,
  type IPdfDocumentModel,
} from '../database/mongo/models/pdf_model.js';
import { Types, type HydratedDocument } from 'mongoose';
import type { IPdfDocumentEntity } from '../../domain/models/pdf_entity.js';
import type { PdfDocumentType } from '../../shared/types/constants/enum.js';

@injectable()
export class PdfRepository
  extends BaseRepository<IPdfDocumentModel, IPdfDocumentEntity>
  implements IPdfRepository
{
  constructor() {
    super(PdfDocumentModel);
  }

  protected toEntity(
    model: HydratedDocument<IPdfDocumentModel>,
  ): IPdfDocumentEntity {
    return {
      _id: model._id.toString(),

      userId: model.userId.toString(),

      original_file_name: model.original_file_name,

      stored_file_name: model.stored_file_name,

      type: model.type,

      ...(model.parent_document_id && {
        parent_document_id: model.parent_document_id.toString(),
      }),

      ...(model.pages_included && {
        pages_included: model.pages_included,
      }),

      total_pages: model.total_pages,

      url: model.url,

      public_id: model.public_id,

      size_in_bytes: model.size_in_bytes,

      mime_type: model.mime_type,

      createdAt: model.createdAt,

      updatedAt: model.updatedAt,
    };
  }

  protected toModel(
    entity: Partial<IPdfDocumentEntity>,
  ): Partial<IPdfDocumentModel> {
    return {
      ...(entity.userId !== undefined && {
        userId: new Types.ObjectId(entity.userId),
      }),

      ...(entity.original_file_name !== undefined && {
        original_file_name: entity.original_file_name,
      }),

      ...(entity.stored_file_name !== undefined && {
        stored_file_name: entity.stored_file_name,
      }),

      ...(entity.type !== undefined && {
        type: entity.type,
      }),

      ...(entity.parent_document_id !== undefined && {
        parent_document_id: new Types.ObjectId(entity.parent_document_id),
      }),

      ...(entity.pages_included !== undefined && {
        pages_included: entity.pages_included,
      }),

      ...(entity.total_pages !== undefined && {
        total_pages: entity.total_pages,
      }),

      ...(entity.url !== undefined && {
        url: entity.url,
      }),

      ...(entity.public_id !== undefined && {
        public_id: entity.public_id,
      }),

      ...(entity.size_in_bytes !== undefined && {
        size_in_bytes: entity.size_in_bytes,
      }),

      ...(entity.mime_type !== undefined && {
        mime_type: entity.mime_type,
      }),

      ...(entity.createdAt !== undefined && {
        createdAt: entity.createdAt,
      }),

      ...(entity.updatedAt !== undefined && {
        updatedAt: entity.updatedAt,
      }),
    };
  }

  async listAllPdfs(
    userId: string,
    type: PdfDocumentType,
    page: number,
    limit: number,
  ): Promise<{
    data: IPdfDocumentEntity[];
    total: number;
    page: number;
    limit: number;
  }> {
    return this.findDocumentsWithPagination(
      {
        userId: new Types.ObjectId(userId),
        type,
      },
      page,
      limit,
    );
  }
}
