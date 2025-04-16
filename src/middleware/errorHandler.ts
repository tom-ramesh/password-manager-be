import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/response.js';

interface CustomError extends Error {
  statusCode?: number;
}

/**
 * Global error handling middleware for unexpected errors
 */
export function errorHandler(
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error('Unexpected error:', err.stack);

  // Default to 500 for unexpected errors
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  const response = errorResponse(
    message, 
    statusCode, 
    process.env.NODE_ENV === 'development' ? err.stack : null
  );
  
  res.status(statusCode).json(response);
} 