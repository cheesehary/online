import fs from "fs";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { validationResult } from "express-validator/check";

export const getChunkPath = (file: string, chunkName: string): string =>
  JSON.parse(fs.readFileSync(file).toString())[chunkName];

export const controllerErrorWrap = (fn: RequestHandler) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export const formattedValidationResult = (req: Request) => {
  return validationResult(req).formatWith(({ param, msg }) => ({
    field: param,
    msg: `${param}: ${msg}`
  }));
};
