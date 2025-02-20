import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errorApp';

const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
//   console.error(err);

  if (
    err instanceof SyntaxError &&
    'status' in err &&
    err.status === 400 &&
    'body' in err
  ) {
    return res.status(400).json({
      error: true,
      message: 'Invalid JSON format. Please check your request body.',
    });
  }

  if (err instanceof AppError) {
    return res.status(err.status).json({
      error: true,
      message: err.message,
      details: err.details || null,
    });
  }

  res.status(500).json({
    error: true,
    message: 'Internal server error',
  });
};

export default errorHandler;
