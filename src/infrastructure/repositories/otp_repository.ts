import { injectable } from 'tsyringe';
import type { IOtpEntity } from '../../domain/models/otp_entity.js';
import {
  OtpModel,
  type IOtpModel,
} from '../database/mongo/models/otp_model.js';
import { BaseRepository } from './base_repository.js';
import type { HydratedDocument } from 'mongoose';
import type { IOtpRepository } from '../../domain/repositories/otp_repository.iterface.js';

@injectable()
export class OtpRepository
  extends BaseRepository<IOtpModel, IOtpEntity>
  implements IOtpRepository
{
  constructor() {
    super(OtpModel);
  }

  protected toEntity(model: HydratedDocument<IOtpModel>): IOtpEntity {
    return {
      _id: model._id.toString(),
      otp: model.otp,
      email: model.email,
      expiresAt: model.expiresAt,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };
  }

  protected toModel(entity: Partial<IOtpEntity>): Partial<IOtpModel> {
    return {
      ...(entity.otp !== undefined && {
        otp: entity.otp,
      }),

      ...(entity.email !== undefined && {
        email: entity.email,
      }),

      ...(entity.expiresAt !== undefined && {
        expiresAt: entity.expiresAt,
      }),
    };
  }

  async findLatestOtp(email: string): Promise<IOtpEntity | null> {
    const result = await this.model
      .findOne({ email })
      .sort({ createdAt: -1 })
      .exec();

    return result ? this.toEntity(result) : null;
  }
}
