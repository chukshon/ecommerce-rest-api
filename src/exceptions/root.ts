//message, statusCode, errorCode, errors

export class HttpExceptions extends Error {
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

export enum ErrorCode {
  USER_NOT_FOUND = 1001,
  USER_ALREADY_EXISTS = 1002,
  INCORRECT_PASSWORD = 1003,
}
