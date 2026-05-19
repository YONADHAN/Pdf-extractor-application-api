import { EmailService } from '../infrastructure/services/email_service.js';
import type { IEmailService } from '../domain/services/email_service.interface.js';
import { container } from 'tsyringe';
import { CloudinaryFileStorageService } from '../infrastructure/services/cloudinary_file_storage.service.js';
import type { ICloudinaryFileStorageService } from '../domain/services/cloudinary_file_storage_service.interface.js';
export class ServiceRegistry {
  static registerServices(): void {
    
    container.register<IEmailService>('IEmailService', {
      useClass: EmailService,
    });

    container.register<ICloudinaryFileStorageService>(
      'ICloudinaryFileStorageService',
      {
        useClass: CloudinaryFileStorageService,
      },
    );
  }
}
