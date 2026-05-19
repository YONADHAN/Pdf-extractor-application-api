import upload from '../middlewares/multer_middleware.js';
import { BaseRoute } from './base_route.js';
import { asyncHandler } from '../../shared/utils/async_handler.js';
import { pdfController } from '../../container/resolver.js';
import { AuthMiddleware } from '../middlewares/auth_middleware.js';

export class PdfRoute extends BaseRoute {
  private authMiddleware = new AuthMiddleware();
  constructor() {
    super();
    this.initRoutes();
  }

  protected initRoutes(): void {
    this.router.post(
      '/upload',
      this.authMiddleware.authenticate.bind(this.authMiddleware),
      upload.single('pdf'),
      asyncHandler(pdfController.uploadNewPdf.bind(pdfController)),
    );

    this.router.post(
      '/generate',
      this.authMiddleware.authenticate.bind(this.authMiddleware),
      asyncHandler(pdfController.generateNewPdf.bind(pdfController)),
    );

    this.router.get(
      '/list/:type',
      this.authMiddleware.authenticate.bind(this.authMiddleware),
      asyncHandler(pdfController.listAllPdfs.bind(pdfController)),
    );

    this.router.delete(
      '/delete/:id',
      this.authMiddleware.authenticate.bind(this.authMiddleware),
      asyncHandler(pdfController.deletePdf.bind(pdfController)),
    );

    this.router.get(
      '/view/:id',
      this.authMiddleware.authenticate.bind(this.authMiddleware),
      asyncHandler(pdfController.viewSinglePdf.bind(pdfController)),
    );
  }
}
