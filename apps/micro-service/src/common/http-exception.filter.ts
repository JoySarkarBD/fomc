import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ServiceResponse } from './response.interface';

/**
 * Global exception filter to catch all unhandled exceptions and format the response
 * according to the ServiceResponse structure.
 * This filter handles both HttpExceptions (like 404, 400, etc.) and any other unexpected errors, ensuring that clients receive a consistent error response format.
 * The filter extracts relevant information from the exception and the request to provide a detailed error response, including the HTTP method, endpoint, status code, and a timestamp. It also handles validation errors by parsing the message array and returning a structured list of field errors when applicable.
 * This filter is registered globally in the main.ts file, ensuring that all exceptions thrown within the application are processed through this filter, providing a unified error handling mechanism across the entire microservice.
 * By centralizing exception handling in this filter, we can maintain cleaner controller and service code, as they can simply throw exceptions without worrying about the response formatting, while still ensuring that clients receive informative and consistent error responses.
 * Overall, this HttpExceptionFilter enhances the robustness and user-friendliness of the API by providing clear and structured error responses for all types of exceptions that may occur during request processing.
 * Note: This filter should be used in conjunction with the ResponseInterceptor to ensure that all responses, including errors, adhere to the same response structure defined by the ServiceResponse interface.
 *
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    // Extract the HTTP context from the ArgumentsHost
    const ctx = host.switchToHttp();
    // Get the response and request objects from the context
    const response = ctx.getResponse();
    // Get the request object to extract method and URL information
    const request = ctx.getRequest();
    // Determine the HTTP status code based on the type of exception
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    // Initialize a default error message and an optional data object to hold additional error details
    let message = 'Request failed';
    let data: Record<string, unknown> | null = null;
    let errors: Array<{ fieldName: string; error: string }> | undefined;
    // If the exception is an instance of HttpException, extract the response body to determine the error message and any additional details
    if (exception instanceof HttpException) {
      // The response body can be a string or an object. If it's a string, use it directly as the message. If it's an object, check for 'message' and 'error' properties to construct the response.
      const responseBody = exception.getResponse();
      // If the response body is a string, use it as the message. If it's an object, check for 'message' and 'error' properties to construct the response. If 'message' is an array (e.g., validation errors), set a generic validation failed message and include the array in the data. If there's an 'error' property, include it in the data as well.
      if (typeof responseBody === 'string') {
        message = responseBody;
      } else if (responseBody && typeof responseBody === 'object') {
        const body = responseBody as {
          message?: string | string[];
          error?: string;
        };
        if (Array.isArray(body.message)) {
          message = 'Validation failed';
          errors = body.message.map((entry) => {
            const [fieldName, ...rest] = entry.split(' ');
            return {
              fieldName: fieldName ?? 'field',
              error: rest.join(' ').trim() || entry,
            };
          });
          data = null;
        } else if (body.message) {
          message = body.message;
        }
        if (body.error && !errors) {
          data = { ...(data ?? {}), error: body.error };
        }
      }
    }

    if (status === HttpStatus.NOT_FOUND) {
      message = 'Path not found';
      data = null;
    }
    // Construct the response payload according to the ServiceResponse structure, including success status, message, method, endpoint, status code, timestamp, and any additional error data
    const payload: ServiceResponse = {
      success: false,
      message,
      method: request?.method,
      endpoint: request?.originalUrl || request?.url || '',
      statusCode: status,
      timestamp: new Date().toISOString(),
      data: data ?? undefined,
      errors,
    };
    // Send the formatted error response back to the client with the appropriate HTTP status code
    response.status(status).json(payload);
  }
}
