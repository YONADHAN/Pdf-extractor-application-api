export interface IUploadFileResponse {
  url: string;
  public_id: string;
}

export interface ICloudinaryFileStorageService {
  uploadFile(data: {
    buffer: Buffer;
    folder_name: string;
    file_name: string;
  }): Promise<IUploadFileResponse>;

  deleteFile(public_id: string): Promise<void>;
}
