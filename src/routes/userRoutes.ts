import express from 'express';
import { updateUserDataController, fetchUserDataController } from '../controller/api';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.put('/update-user-data', authMiddleware, updateUserDataController);
router.get('/fetch-user-data', authMiddleware, fetchUserDataController);

export default router;