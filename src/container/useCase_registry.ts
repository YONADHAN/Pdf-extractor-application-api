import { container } from 'tsyringe';

//AUTH
import type { ISendOtpEmailUseCase } from '../domain/usecases/auth/send_email_usecase_interface.js';
import { SendOtpEmailUseCase } from '../application/usecases/auth/send_otp_email_usecase.js';
import type { IVerifyOtpUseCase } from '../domain/usecases/auth/verify_otp_interface.js';
import { VerifyOtpUseCase } from '../application/usecases/auth/verify_otp_usecase.js';
import type { IRegisterUserUseCase } from '../domain/usecases/auth/register_usecase_interface.js';
import { RegisterUserUseCase } from '../application/usecases/auth/register_usecase.js';
import type { ILoginUserUseCase } from '../domain/usecases/auth/login_usecase_interface.js';
import { LoginUserUseCase } from '../application/usecases/auth/login_usecase.js';

//PDF
import type { IDeletePdfUseCase } from '../domain/usecases/pdf/delete_pdf_usecase_interface.js';
import { DeletePdfUseCase } from '../application/usecases/pdf/delete_pdf_usecase.js';
import type { IGenerateNewPdfUseCase } from '../domain/usecases/pdf/generate_new_pdf_usecase_interface.js';
import { GenerateNewPdfUseCase } from '../application/usecases/pdf/generate_new_pdf_usecase.js';
import type { IListAllPdfUseCase } from '../domain/usecases/pdf/list_all_pdf_usecase_interface.js';
import { ListAllPdfUseCase } from '../application/usecases/pdf/list_all_pdf_usecase.js';
import type { IUploadNewPdfUseCase } from '../domain/usecases/pdf/upload_new_pdf_usecase_interface.js';
import { UploadNewPdfUseCase } from '../application/usecases/pdf/upload_new_pdf_usecase.js';
import type { IViewSinglePdfUseCase } from '../domain/usecases/pdf/view_single_pdf_usecase_interface.js';
import { ViewSinglePdfUseCase } from '../application/usecases/pdf/view_single_pdf_usecase.js';

export class UseCaseRegistry {
  static registerUseCases(): void {
    //AUTH

    container.register<ISendOtpEmailUseCase>('ISendOtpEmailUseCase', {
      useClass: SendOtpEmailUseCase,
    });

    container.register<IVerifyOtpUseCase>('IVerifyOtpUseCase', {
      useClass: VerifyOtpUseCase,
    });

    container.register<IRegisterUserUseCase>('IRegisterUserUseCase', {
      useClass: RegisterUserUseCase,
    });

    container.register<ILoginUserUseCase>('ILoginUserUseCase', {
      useClass: LoginUserUseCase,
    });

    //PDF

    container.register<IDeletePdfUseCase>('IDeletePdfUseCase', {
      useClass: DeletePdfUseCase,
    });

    container.register<IGenerateNewPdfUseCase>('IGenerateNewPdfUseCase', {
      useClass: GenerateNewPdfUseCase,
    });

    container.register<IListAllPdfUseCase>('IListAllPdfUseCase', {
      useClass: ListAllPdfUseCase,
    });

    container.register<IUploadNewPdfUseCase>('IUploadNewPdfUseCase', {
      useClass: UploadNewPdfUseCase,
    });

    container.register<IViewSinglePdfUseCase>('IViewSinglePdfUseCase', {
      useClass: ViewSinglePdfUseCase,
    });
  }
}
