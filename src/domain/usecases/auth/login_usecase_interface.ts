import type {
  LoginUseCaseRequestDTO,
  LoginUseCaseResponseDTO,
} from '../../../application/dtos/auth/login_usecase_dto.js';

export interface ILoginUserUseCase {
  execute(data: LoginUseCaseRequestDTO): Promise<LoginUseCaseResponseDTO>;
}
