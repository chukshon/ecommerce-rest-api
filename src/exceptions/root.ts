//message, statusCode, errorCode, errors

class HttpException extends Error {
  message: string;
  statusCode: number;
  errorCode: string;
  errors: any[];

  constructor(
    message: string,
    statusCode: number,
    errorCode: string,
    errors: any[]
  ) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.errors = errors;
  }
}
