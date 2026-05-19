import type { Role } from '../../../../shared/types/constants/enum.js';

export interface UserMongoBase {
  userUUID: string;
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
