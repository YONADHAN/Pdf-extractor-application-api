import type { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { HTTP_STATUS } from '../../shared/types/constants/constants.js';
import { CustomError } from '../../shared/error/customErrorHandler.js';

import type { IPdfController } from '../../domain/controller/pdf_controller_interface.js';
import type { IUploadNewPdfUseCase } from '../../domain/usecases/pdf/upload_new_pdf_usecase_interface.js';
import type { IGenerateNewPdfUseCase } from '../../domain/usecases/pdf/generate_new_pdf_usecase_interface.js';
import { PdfDocumentType } from '../../shared/types/constants/enum.js';
import type { IListAllPdfUseCase } from '../../domain/usecases/pdf/list_all_pdf_usecase_interface.js';
import type { IDeletePdfUseCase } from '../../domain/usecases/pdf/delete_pdf_usecase_interface.js';
import type { IViewSinglePdfUseCase } from '../../domain/usecases/pdf/view_single_pdf_usecase_interface.js';

@injectable()
export class PdfController implements IPdfController {
  constructor(
    @inject('IUploadNewPdfUseCase')
    private _uploadNewPdfUseCase: IUploadNewPdfUseCase,
    @inject('IGenerateNewPdfUseCase')
    private _generateNewPdfUseCase: IGenerateNewPdfUseCase,
    @inject('IListAllPdfUseCase')
    private _listAllPdfsUseCase: IListAllPdfUseCase,
    @inject('IDeletePdfUseCase')
    private _deletePdfUseCase: IDeletePdfUseCase,
    @inject('IViewSinglePdfUseCase')
    private _viewSinglePdfUseCase: IViewSinglePdfUseCase,
  ) { }

  async me(req: Request, res: Response): Promise<void> {
    res.status(200).json({
      "success": true,
      "user": req.user
    })
  }

  async uploadNewPdf(req: Request, res: Response): Promise<void> {
    if (!req.file) {
      throw new CustomError('No PDF uploaded', HTTP_STATUS.BAD_REQUEST);
    }

    if (!req.user?.userUUID) {
      throw new CustomError('Unauthorized', HTTP_STATUS.UNAUTHORIZED);
    }

    const response = await this._uploadNewPdfUseCase.execute({
      file: req.file,

      userId: req.user.userId,
    });

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: 'PDF uploaded successfully',
      data: response,
    });
  }

  async generateNewPdf(req: Request, res: Response): Promise<void> {
    const { stored_file_name, pages } = req.body;

    if (!stored_file_name || typeof stored_file_name !== 'string') {
      throw new CustomError(
        'Invalid stored file name',
        HTTP_STATUS.BAD_REQUEST,
      );
    }

    if (!Array.isArray(pages) || pages.length === 0) {
      throw new CustomError('Pages array required', HTTP_STATUS.BAD_REQUEST);
    }

    const invalidPages = pages.some(
      (page) => typeof page !== 'number' || page <= 0,
    );

    if (invalidPages) {
      throw new CustomError('Invalid page numbers', HTTP_STATUS.BAD_REQUEST);
    }

    const response = await this._generateNewPdfUseCase.execute({
      userId: req.user!.userId,

      stored_file_name,

      pages,
    });

    res.status(HTTP_STATUS.CREATED).json({
      success: true,

      message: 'PDF generated successfully',

      data: response,
    });
  }

  async listAllPdfs(req: Request, res: Response): Promise<void> {
    //paginated one
    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;

    const { type } = req.params;

    if (
      type !== PdfDocumentType.ORIGINAL &&
      type !== PdfDocumentType.EXTRACTED
    ) {
      throw new CustomError('Invalid pdf type', HTTP_STATUS.BAD_REQUEST);
    }

    const userId = req.user.userId;

    const result = await this._listAllPdfsUseCase.execute({
      userId,
      type,
      page,
      limit,
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  }

  async deletePdf(req: Request, res: Response): Promise<void> {
    const  stored_file_name  = req.params.id;

    if (!stored_file_name || typeof stored_file_name !== 'string') {
      throw new CustomError(
        'Stored file name required',
        HTTP_STATUS.BAD_REQUEST,
      );
    }

    await this._deletePdfUseCase.execute({
      userId: req.user!.userId,

      stored_file_name,
    });

    res.status(HTTP_STATUS.OK).json({
      success: true,

      message: 'PDF deleted successfully',
    });
  }

  async viewSinglePdf(req: Request, res: Response): Promise<void> {
    const  stored_file_name  = req.params.id;

    if (!stored_file_name || typeof stored_file_name !== 'string') {
      throw new CustomError(
        'Stored file name required',
        HTTP_STATUS.BAD_REQUEST,
      );
    }

    const pdf = await this._viewSinglePdfUseCase.execute({
      userId: req.user!.userId,

      stored_file_name,
    });

    res.status(HTTP_STATUS.OK).json({
      success: true,

      message: 'Successfully fetched document',

      data: pdf,
    });
  }
}
