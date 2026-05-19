import { injectable, inject } from 'tsyringe';
import type { IUserRepository } from '../../../domain/repositories/user_repository.interface.js';

import { CustomError } from '../../../shared/error/customErrorHandler.js';
import {
  CounterRepositoryKey,
  ERROR_MESSAGES,
  HTTP_STATUS,
} from '../../../shared/types/constants/constants.js';
import type { IRegisterUserUseCase } from '../../../domain/usecases/auth/register_usecase_interface.js';
import { hashPassword } from '../../../shared/utils/password_utils.js';
import type { Role } from '../../../shared/types/constants/enum.js';
import type { ICounterRepository } from '../../../domain/repositories/counter_repository.interface.js';
import type { RegisterUseCaseRequestDTO } from '../../dtos/auth/register_usecase_dto.js';

@injectable()
export class RegisterUserUseCase implements IRegisterUserUseCase {
  constructor(
    @inject('IUserRepository')
    private _userRepository: IUserRepository,
    @inject('ICounterRepository')
    private _counterRepository: ICounterRepository,
  ) {}

  async execute({
    name,
    email,
    password,
    confirmPassword,
  }: RegisterUseCaseRequestDTO): Promise<void> {
    if (confirmPassword.trim() !== password.trim()) {
      throw new CustomError(
        ERROR_MESSAGES.PASSWORD_NOT_MATCH,
        HTTP_STATUS.CONFLICT,
      );
    }
    const isExistingUser = await this._userRepository.findOne({ email });
    if (isExistingUser) {
      throw new CustomError(
        ERROR_MESSAGES.USER_ALREADY_EXISTS,
        HTTP_STATUS.METHOD_NOT_ALLOWED,
      );
    }
    const hashedPassword = await hashPassword(password);
    const userUUID = await this._counterRepository.createNextUniqueId(
      CounterRepositoryKey.USER,
    );
    const dataToSave = {
      userUUID,
      name,
      email,
      hashedPassword,
      role: 'user' as Role,
    };

    await this._userRepository.create(dataToSave);
  }
}
