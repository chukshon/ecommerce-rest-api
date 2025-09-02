import { ErrorCodes } from "../types";
import { HttpExceptions } from "./root";

export class BadRequestsException extends HttpExceptions {
  constructor(message: string, errorCode: ErrorCodes) {
    super(message, 400, errorCode, null);
  }
}
