import { ErrorCodes, ErrorMessages } from "./types";
import { HttpExceptions } from "./exceptions/root";
import { InternalException } from "./exceptions/internal-exception";
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { BadRequestsException } from "./exceptions/bad-requests";

export const errorHandler = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (err: any) {
      let exception: HttpExceptions;
      if (err instanceof HttpExceptions) {
        exception = err;
      } else {
        if (err instanceof ZodError) {
          exception = new BadRequestsException(
            ErrorMessages.UNPROCESSABLE_ENTITY,
            ErrorCodes.UNPROCESSABLE_ENTITY,
            err
          );
        } else {
          exception = new InternalException(
            "Something went wrong",
            err,
            ErrorCodes.INTERNAL_SERVER_ERROR
          );
        }
      }

      next(exception);
    }
  };
};
