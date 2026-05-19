import type { IUserEntity } from '../../../domain/models/user_entity.js';

import type { LoginUseCaseResponseDTO } from '../../dtos/auth/login_usecase_dto.js';

export function mapLoginResponse(user: IUserEntity): LoginUseCaseResponseDTO {
  return {
    userId: user._id!,

    userUUID: user.userUUID,

    name: user.name,

    email: user.email,
  };
}
