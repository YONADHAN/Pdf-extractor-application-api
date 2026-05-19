import { injectable } from 'tsyringe';
import { BaseRepository } from './base_repository.js';
import type { IUserModel } from '../database/mongo/models/user_model.js';
import type { IUserEntity } from '../../domain/models/user_entity.js';
import type { HydratedDocument } from 'mongoose';
import type { IUserRepository } from '../../domain/repositories/user_repository.interface.js';

@injectable()
export class UserRepository
  extends BaseRepository<IUserModel, IUserEntity>
  implements IUserRepository
{
  protected toEntity(model: HydratedDocument<IUserModel>): IUserEntity {
    return {
      userUUID: model.userUUID,
      name: model.name,
      email: model.email,
      passwordHash: model.passwordHash,
      role: model.role,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };
  }

  protected toModel(entity: Partial<IUserEntity>): Partial<IUserModel> {
    return {
      ...(entity.userUUID !== undefined && {
        userUUID: entity.userUUID,
      }),

      ...(entity.name !== undefined && {
        name: entity.name,
      }),

      ...(entity.email !== undefined && {
        email: entity.email,
      }),

      ...(entity.passwordHash !== undefined && {
        passwordHash: entity.passwordHash,
      }),

      ...(entity.role !== undefined && {
        role: entity.role,
      }),
    };
  }
}
