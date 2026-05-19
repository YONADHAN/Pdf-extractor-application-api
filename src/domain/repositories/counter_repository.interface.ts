import type { ICounterModel } from '../../infrastructure/database/mongo/models/counter_model.js';
import type { ICounterEntity } from '../models/counter_entity.js';
import type { IBaseRepository } from './base_repository.interface.js';

export interface ICounterRepository extends IBaseRepository<
  ICounterModel,
  ICounterEntity
> {
  createNextUniqueId(key: string): Promise<string>;
}
