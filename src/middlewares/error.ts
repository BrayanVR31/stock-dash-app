import { Request, Response, NextFunction } from "express";
import chalk from "chalk";
import { ServerError } from "@interfaces";

export function handleServerError(
  error: ServerError,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const {
    message,
    statusCode: code,
    logging = false,
    type = "UNKNOWN_ERROR",
  } = error;
  if (logging)
    console.log(
      `${chalk.bgHex("#248232").white("status")} ${chalk.italic(code)} - [${type}] -details: ${message}`,
    );
  response.status(error.statusCode).json({
    error: {
      code,
      message,
      type,
    },
  });
}
