import { v2 as cloudinary } from 'cloudinary';
import { injectable } from 'tsyringe';
import streamifier from 'streamifier';

import { config } from '../../shared/config/env.validation.js';

import type {
  ICloudinaryFileStorageService,
  IUploadFileResponse,
} from '../../domain/services/cloudinary_file_storage_service.interface.js';
import {
  ERROR_MESSAGES,
  HTTP_STATUS_CODE,
} from '../../shared/types/constants/constants.js';
import { CustomError } from '../../shared/error/customErrorHandler.js';

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.cloud_api_key,
  api_secret: config.cloudinary.cloud_api_secret,
  secure: true,
});

@injectable()
export class CloudinaryFileStorageService implements ICloudinaryFileStorageService {
  constructor() {}

  async uploadFile({
    buffer,
    folder_name,
    file_name,
  }: {
    buffer: Buffer;
    folder_name: string;
    file_name: string;
  }): Promise<IUploadFileResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'raw',
          folder: folder_name,
          public_id: file_name,
          use_filename: true,
          unique_filename: true,
        },

        (error, result) => {
          if (error || !result) {
            return reject(
              new CustomError(
                ERROR_MESSAGES.CLOUDINARY_UPLOAD_FAILED,
                HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
              ),
            );
          }

          resolve({
            url: result.secure_url,
            public_id: result.public_id,
          });
        },
      );

      streamifier.createReadStream(buffer).pipe(uploadStream);
    });
  }

  async deleteFile(public_id: string): Promise<void> {
    await cloudinary.uploader.destroy(public_id, {
      resource_type: 'raw',
    });
  }
}
