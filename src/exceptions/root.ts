import { ErrorCodes } from "../types";
export class HttpExceptions extends Error {
  message: string;
  statusCode: number;
  errorCode: ErrorCodes;
  errors: any;

  constructor(
    message: string,
    statusCode: number,
    errorCode: ErrorCodes,
    errors: any
  ) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.errors = errors;
  }
}
