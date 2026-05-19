import { container } from 'tsyringe';
import { DependencyInjection } from './index.js';

import type { IAuthController } from '../domain/controller/auth_controller_interface.js';
import { AuthController } from '../presentation/controllers/auth_controller.js';
import type { IPdfController } from '../domain/controller/pdf_controller_interface.js';
import { PdfController } from '../presentation/controllers/pdf_controller.js';

DependencyInjection.registerAll();

export const authController =
  container.resolve<IAuthController>(AuthController);

export const pdfController = container.resolve<IPdfController>(PdfController);
