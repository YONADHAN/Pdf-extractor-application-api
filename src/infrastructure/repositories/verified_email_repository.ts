import { injectable } from "tsyringe";
import type { IVerifiedEmailEntity } from "../../domain/models/verified_email_entity.js";
import { VerifiedEmailModel, type IVerifiedEmailModel } from "../database/mongo/models/verified_email_model.js";
import { BaseRepository } from "./base_repository.js";
import type { HydratedDocument } from "mongoose";
import type { IVerifiedRepository } from "../../domain/repositories/verified_email_repository.interface.js";


@injectable()
export class VerifiedEmailRepository extends BaseRepository<IVerifiedEmailModel, IVerifiedEmailEntity> implements IVerifiedRepository {
    constructor(){
        super(VerifiedEmailModel)
    }

    protected toEntity(model: HydratedDocument<IVerifiedEmailModel>): IVerifiedEmailEntity {
        return {
            _id: model._id.toString(),
            email: model.email,
            expiresAt: model.expiresAt,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt,
        };
    }


    protected toModel(entity: Partial<IVerifiedEmailEntity>):Partial<IVerifiedEmailModel>{
        return {
            ...(entity.email !== undefined && {
                email: entity.email,
            }),
            ...(entity.expiresAt !== undefined && {
                expiresAt: entity.expiresAt,
            })
        }
    }
}