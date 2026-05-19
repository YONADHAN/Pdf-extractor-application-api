import type { Role } from '../../shared/types/constants/enum.js';

export interface IUserEntity {
  _id?: string;
  userUUID: string;
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
