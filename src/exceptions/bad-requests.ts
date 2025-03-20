import { HttpExceptions, ErrorCodes } from "./root";

export class BadRequestsException extends HttpExceptions {
  constructor(message: string, errorCode: ErrorCodes, errors: any) {
    super(message, 400, errorCode, errors);
  }
}
