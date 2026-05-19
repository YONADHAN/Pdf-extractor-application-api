export interface IBaseRepository<TModel, TEntity> {
  create(entity: Partial<TEntity>): Promise<TEntity>;
  findOne(filter: any): Promise<TEntity | null>;
  findDocumentsWithPagination(
    filter: any,
    page: number,
    limit: number,
  ): Promise<{ data: TEntity[]; total: number; page: number; limit: number }>;
  update(filter: any, updateData: Partial<TEntity>): Promise<TEntity | null>;
  delete(filter: any): Promise<boolean>;
}
