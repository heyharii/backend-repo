import { Request, Response, NextFunction } from 'express';
import { updateUserData, fetchUserData } from '../repository/userCollection';
import { ApiError } from '../entities/ApiError';

interface AuthenticatedRequest extends Request {
  user?: {
    uid: string;
  };
}

export const updateUserDataController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.uid;
    if (!userId) {
      throw new ApiError(401, 'User not authenticated');
    }
    await updateUserData(userId, req.body);
    res.status(200).json({ message: 'User data updated successfully' });
  } catch (error) {
    next(error instanceof ApiError ? error : new ApiError(500, 'Error updating user data'));
  }
};

export const fetchUserDataController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.uid;
    if (!userId) {
      throw new ApiError(401, 'User not authenticated');
    }
    const userData = await fetchUserData(userId);
    res.status(200).json(userData);
  } catch (error) {
    next(error instanceof ApiError ? error : new ApiError(500, 'Error fetching user data'));
  }
};
