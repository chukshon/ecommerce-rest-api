import { ErrorCodes } from "../types";
import { HttpExceptions } from "./root";

export class UnprocessableEntity extends HttpExceptions {
  constructor(error: any, message: string, errorCode: ErrorCodes) {
    super(message, 422, errorCode, error);
  }
}
