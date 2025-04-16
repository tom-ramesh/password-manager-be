interface SuccessResponse<T = any> {
  status: 'success';
  statusCode: number;
  message: string;
  data: T;
}

interface ErrorResponse {
  status: 'error';
  statusCode: number;
  message: string;
  errors: any | null;
}

/**
 * Create a success response
 */
export function successResponse<T = any>(
  data: T,
  message = 'Success',
  statusCode = 200
): SuccessResponse<T> {
  return {
    status: 'success',
    statusCode,
    message,
    data
  };
}

/**
 * Create an error response
 */
export function errorResponse(
  message = 'Error',
  statusCode = 500,
  errors: any | null = null
): ErrorResponse {
  return {
    status: 'error',
    statusCode,
    message,
    errors
  };
} 