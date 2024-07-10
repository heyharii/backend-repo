import express, { Request, Response, NextFunction } from 'express';
import userRoutes from '../routes/userRoutes';
import { ApiError } from '../entities/ApiError';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);

app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;