import type { Request, Response } from 'express';

export interface IPdfController {
  me(req: Request, res: Response): Promise<void>;
  uploadNewPdf(req: Request, res: Response): Promise<void>;
  listAllPdfs(req: Request, res: Response): Promise<void>;
  viewSinglePdf(req: Request, res: Response): Promise<void>;
  generateNewPdf(req: Request, res: Response): Promise<void>;
  deletePdf(req: Request, res: Response): Promise<void>;
}
