import type { RegisterUseCaseRequestDTO } from '../../../application/dtos/auth/register_usecase_dto.js';

export interface IRegisterUserUseCase {
  execute(data: RegisterUseCaseRequestDTO): Promise<void>;
}
