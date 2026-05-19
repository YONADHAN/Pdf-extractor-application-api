import { injectable } from 'tsyringe';
import type { ICounterEntity } from '../../domain/models/counter_entity.js';
import {
  CounterModel,
  type ICounterModel,
} from '../../infrastructure/database/mongo/models/counter_model.js';
import { BaseRepository } from '../../infrastructure/repositories/base_repository.js';
import type { HydratedDocument } from 'mongoose';
import type { ICounterRepository } from '../../domain/repositories/counter_repository.interface.js';

@injectable()
export class CounterRepository
  extends BaseRepository<ICounterModel, ICounterEntity>
  implements ICounterRepository
{
  constructor() {
    super(CounterModel);
  }

  protected toEntity(model: HydratedDocument<ICounterModel>): ICounterEntity {
    return {
      _id: model._id.toString(),
      key: model.key,
      value: model.value,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };
  }

  protected toModel(entity: Partial<ICounterEntity>): Partial<ICounterModel> {
    return {
      ...(entity.key !== undefined && {
        key: entity.key,
      }),
      ...(entity.value !== undefined && {
        value: entity.value,
      }),
    };
  }

  async createNextUniqueId(key: string): Promise<string> {
    const counter = await this.model.findOneAndUpdate(
      { key },

      {
        $inc: {
          value: 1,
        },
      },

      {
        new: true,
        upsert: true,
      },
    );

    return `${key}_${counter.value}`;
  }
}
