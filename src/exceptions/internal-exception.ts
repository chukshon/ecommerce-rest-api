import { HttpExceptions } from "./root";

export class InternalException extends HttpExceptions {
  constructor(message: string, errors: any, errorCode: number) {
    super(message, 500, errorCode, errors);
  }
}
