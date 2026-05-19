import type { IOtpModel } from '../../infrastructure/database/mongo/models/otp_model.js';
import type { IOtpEntity } from '../models/otp_entity.js';
import type { IBaseRepository } from './base_repository.interface.js';

export interface IOtpRepository extends IBaseRepository<IOtpModel, IOtpEntity> {
  findLatestOtp(email: string): Promise<IOtpEntity | null>;
}
