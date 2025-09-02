import { ErrorCodes } from "../types";
import { HttpExceptions } from "./root";

export class NotFoundException extends HttpExceptions {
  constructor(message: string, errorCode: ErrorCodes) {
    super(message, 404, errorCode, null);
  }
}
