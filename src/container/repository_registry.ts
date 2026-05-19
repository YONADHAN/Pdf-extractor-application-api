import type { IUserRepository } from '../domain/repositories/user_repository.interface.js';
import { UserRepository } from '../infrastructure/repositories/user.repository.js';

import type { IOtpRepository } from '../domain/repositories/otp_repository.iterface.js';
import { OtpRepository } from '../infrastructure/repositories/otp_repository.js';

import type { IPdfRepository } from '../domain/repositories/pdf_repository.interface.js';
import { PdfRepository } from '../infrastructure/repositories/pdf.repository.js';

import type { ICounterRepository } from '../domain/repositories/counter_repository.interface.js';
import { CounterRepository } from '../infrastructure/repositories/counter_repository.js';

import type { IVerifiedEmailRepository } from '../domain/repositories/verified_email_repository.interface.js';
import { VerifiedEmailRepository } from '../infrastructure/repositories/verified_email_repository.js';

import { container } from 'tsyringe';


export class RepositoryRegistry {
  static registerRepositories(): void {
    container.register<IUserRepository>('IUserRepository', {
      useClass: UserRepository,
    });
    container.register<IOtpRepository>('IOtpRepository', {
      useClass: OtpRepository,
    });
    container.register<IPdfRepository>('IPdfRepository', {
      useClass: PdfRepository,
    });
    container.register<ICounterRepository>('ICounterRepository', {
      useClass: CounterRepository,
    });
    container.register<IVerifiedEmailRepository>('IVerifiedEmailRepository',{
      useClass: VerifiedEmailRepository,
    })
  }
}
