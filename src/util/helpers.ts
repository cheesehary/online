import path from 'path';
import fs from 'fs';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { validationResult } from 'express-validator/check';

export const getChunkPath = (relativePath: string, chunkName: string) =>
  JSON.parse(fs.readFileSync(path.join(__dirname, relativePath)).toString())[
    chunkName
  ];

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
