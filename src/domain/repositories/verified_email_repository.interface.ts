import type { IVerifiedEmailModel } from "../../infrastructure/database/mongo/models/verified_email_model.js";
import type { IVerifiedEmailEntity } from "../models/verified_email_entity.js";
import type { IBaseRepository } from "./base_repository.interface.js";


export interface IVerifiedEmailRepository extends IBaseRepository<IVerifiedEmailModel, IVerifiedEmailEntity> {
    
}