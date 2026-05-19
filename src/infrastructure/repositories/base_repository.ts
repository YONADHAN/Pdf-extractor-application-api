import { Model, type FilterQuery, type HydratedDocument } from 'mongoose';
import type { IBaseRepository } from '../../domain/repositories/base_repository.interface.js';

export abstract class BaseRepository<
  TModel,
  TEntity,
> implements IBaseRepository<TModel, TEntity> {
  constructor(protected readonly model: Model<TModel>) {}

  protected abstract toEntity(model: HydratedDocument<TModel>): TEntity;

  protected abstract toModel(entity: Partial<TEntity>): Partial<TModel>;

  protected toEntityList(models: HydratedDocument<TModel>[]): TEntity[] {
    return models.map((model) => this.toEntity(model));
  }

  async create(entity: Partial<TEntity>): Promise<TEntity> {
    const modelData = this.toModel(entity);
    const createdModel = await this.model.create(modelData);
    return this.toEntity(createdModel);
  }

  async findOne(filter: FilterQuery<TModel>): Promise<TEntity | null> {
    const foundModel = await this.model.findOne(filter).exec();
    return foundModel ? this.toEntity(foundModel) : null;
  }

  async findDocumentsWithPagination(
    filter: FilterQuery<TModel>,
    page: number,
    limit: number,
  ): Promise<{ data: TEntity[]; total: number; page: number; limit: number }> {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.model.find(filter).skip(skip).limit(limit).exec(),
      this.model.countDocuments(filter).exec(),
    ]);
    return {
      data: this.toEntityList(data),
      total,
      page,
      limit,
    };
  }

  async update(
    filter: FilterQuery<TModel>,
    updateData: Partial<TEntity>,
  ): Promise<TEntity | null> {
    const modelData = this.toModel(updateData);
    const updatedModel = await this.model
      .findOneAndUpdate(filter, modelData, { new: true })
      .exec();
    return updatedModel ? this.toEntity(updatedModel) : null;
  }

  async delete(filter: FilterQuery<TModel>): Promise<boolean> {
    const result = await this.model.deleteOne(filter).exec();
    return result.deletedCount === 1;
  }

}
