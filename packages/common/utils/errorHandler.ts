import { NextFunction, Request, Response } from "express";

type func = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<Response<any, Record<string, any>>> | Promise<void>;

export const wrapAsync = (fn: func) => {
  return function (req: Request, res: Response, next: NextFunction) {
    fn(req, res, next).catch(next);
  };
};
