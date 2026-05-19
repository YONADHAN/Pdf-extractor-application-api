import type { IUserModel } from '../../infrastructure/database/mongo/models/user_model.js';
import type { IUserEntity } from '../models/user_entity.js';
import type { IBaseRepository } from './base_repository.interface.js';

export interface IUserRepository extends IBaseRepository<
  IUserModel,
  IUserEntity
> {}
