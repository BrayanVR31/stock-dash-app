import { Request, Response, NextFunction } from "express";

// Types
type Params = {
  id: string;
};

type Controller<T = any> = (
  request: Request<Params, any, T>,
  response: Response,
  nextFunction: NextFunction,
) => Promise<any>;

export type { Controller };
