import { HttpExceptions, ErrorCodes } from "./root";

export class BadRequestsException extends HttpExceptions {
  constructor(message: string, errorCode: string, errors: ErrorCodes) {
    super(message, 400, errorCode, errors);
  }
}
