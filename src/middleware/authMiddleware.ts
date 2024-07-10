import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';
import { ApiError } from '../entities/ApiError';

interface AuthenticatedRequest extends Request {
  user?: admin.auth.DecodedIdToken;
}

export const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split('Bearer ')[1];
  if (!token) {
    return next(new ApiError(401, 'No token provided'));
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    next(new ApiError(401, 'Unauthorized'));
  }
};