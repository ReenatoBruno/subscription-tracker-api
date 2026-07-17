
import type { Request, Response } from 'express';

export interface CustomError extends Error {
  statusCode?: number;
  code?: number;
  errors?: Record<string, { message: string }>;
}

const errorMiddleware = (err: CustomError, req: Request, res: Response): void => {

    let error: CustomError = { ...err, message: err.message, name: err.name };

    console.log(err);

    if (err.name === 'CastError') {
      const message = 'Resource not found'
      error = new Error(message) as CustomError;
      error.statusCode = 404;
    }

    if (err.code === 11000) {
      const message = 'Duplicate field value entered'
      error = new Error(message) as CustomError
      error.statusCode = 400;
    }

    if (err.name === 'ValidationError' && err.errors) {
      const message = Object.values(err.errors)
        .map(val => val.message)
        .join(', ');
      error = new Error(message) as CustomError;
      error.statusCode = 400;
    }

  res.status(error.statusCode || 500).json({ success: false, error: error.message || 'Server Error' });
};

export default errorMiddleware;
