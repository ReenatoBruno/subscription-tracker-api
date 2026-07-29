import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export interface CustomError extends Error {
  statusCode?: number;
  code?: number;
  errors?: Record<string, { message: string }>;
}

const errorMiddleware = (
  err: Error | CustomError | ZodError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void => {

  let error: CustomError = { ...err, message: err.message, name: err.name } as CustomError;

  console.error(err);

  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = new Error(message) as CustomError;
    error.statusCode = 404;
  }

  if ('code' in err && err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new Error(message) as CustomError;
    error.statusCode = 400;
  }

  if (err.name === 'ValidationError' && 'errors' in err && err.errors) {
    const message = Object.values(err.errors)
      .map((val: { message: string }) => val.message)
      .join(', ');

    error = new Error(message) as CustomError;
    error.statusCode = 400;
  }

  if (err instanceof ZodError) {
      const message = err.issues.map((issue) => issue.message).join(', ');
      error = new Error(message) as CustomError;
      error.statusCode = 400;
    }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};

export default errorMiddleware;
