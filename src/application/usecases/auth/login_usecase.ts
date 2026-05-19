import { inject, injectable } from 'tsyringe';
import type { ILoginUserUseCase } from '../../../domain/usecases/auth/login_usecase_interface.js';
import type { IUserRepository } from '../../../domain/repositories/user_repository.interface.js';
import { CustomError } from '../../../shared/error/customErrorHandler.js';
import {
  ERROR_MESSAGES,
  HTTP_STATUS,
} from '../../../shared/types/constants/constants.js';
import {
  comparePassword,
  hashPassword,
} from '../../../shared/utils/password_utils.js';
import type {
  LoginUseCaseRequestDTO,
  LoginUseCaseResponseDTO,
} from '../../dtos/auth/login_usecase_dto.js';
import { mapLoginResponse } from '../../mapper/auth/login_usecase_response_mapper.js';

@injectable()
export class LoginUserUseCase implements ILoginUserUseCase {
  constructor(
    @inject('IUserRepository')
    private _userRepository: IUserRepository,
  ) { }

  async execute({
    email,
    password,
  }: LoginUseCaseRequestDTO): Promise<LoginUseCaseResponseDTO> {
    const user = await this._userRepository.findOne({ email: email.toLowerCase() });
    if (!user) {
      throw new CustomError(
        ERROR_MESSAGES.USER_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND,
      );
    }
    const isPasswordValid =
      await comparePassword(
        password,
        user.passwordHash,
      );
    if (!isPasswordValid) {
      throw new CustomError(
        ERROR_MESSAGES.PASSWORD_IS_WRONG,
        HTTP_STATUS.BAD_REQUEST,
      );
    }

    return mapLoginResponse(user);
  }
}
