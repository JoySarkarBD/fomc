import { HttpException, HttpStatus, NotFoundException } from "@nestjs/common";

/**
 * Handle exceptions from micro-service responses.
 *
 * @param result - The response result from a micro-service, which may contain an exception field indicating an error.
 * @throws NotFoundException if the exception type is "NotFoundException".
 * @throws HttpException with status BAD_REQUEST if the exception type is "HttpException".
 * @throws HttpException with status CONFLICT if the exception type is "ConflictException".
 * @throws HttpException with status INTERNAL_SERVER_ERROR for any other exception types.
 */
export const handleException = (result: any) => {
  if (result?.exception) {
    switch (result.exception) {
      case "NotFoundException":
        throw new NotFoundException(result.message);
      case "HttpException":
        throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
      case "ConflictException":
        throw new HttpException(result.message, HttpStatus.CONFLICT);
      default:
        throw new HttpException(
          result.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }
};
