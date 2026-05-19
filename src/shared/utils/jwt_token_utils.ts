import jwt from 'jsonwebtoken';
import type { JwtPayload, SignOptions } from 'jsonwebtoken';

export function generateJwtToken<T extends object>(
  payload: T,
  secret: string,
  expiresIn?: SignOptions['expiresIn'],
): string {
  const options: SignOptions = {};

  if (expiresIn !== undefined) {
    options.expiresIn = expiresIn;
  }

  return jwt.sign(payload, secret, options);
}

export function verifyJwtToken(
  token: string,
  secret: string,
): JwtPayload | string {
  try {
    return jwt.verify(token, secret);
  } catch {
    throw new Error('Invalid token');
  }
}

export function decodeJwtToken(token: string): JwtPayload | null {
  try {
    return jwt.decode(token) as JwtPayload;
  } catch {
    throw new Error('Invalid token');
  }
}
