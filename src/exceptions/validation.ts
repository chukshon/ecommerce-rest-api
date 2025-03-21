import { HttpExceptions } from "./root";

export class UnprocessableEntity extends HttpExceptions {
  constructor(error: any, message: string, errorCode: number) {
    super(message, 422, errorCode, error);
  }
}
