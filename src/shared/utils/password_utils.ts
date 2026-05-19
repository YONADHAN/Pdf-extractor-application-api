import { hashSync } from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return hashSync(password, saltRounds);
};

export const comparePassword = async (
  hashedPasswordToCheck: string,
  hashedPasswordFromDb: string,
) => {
  return hashedPasswordToCheck === hashedPasswordFromDb;
};
