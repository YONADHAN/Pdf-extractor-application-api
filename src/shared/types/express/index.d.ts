import { JwtPayload } from '../../shared/types/jwt_payload.js';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
