export interface IVerifiedEmailEntity {
  _id?: string;

  email: string;

  expiresAt: Date;

  createdAt: Date;

  updatedAt: Date;
}