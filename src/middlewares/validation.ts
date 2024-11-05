import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { fromError } from "zod-validation-error";

// Validate data from request body passing dynamic zod schema
const validateSchema =
  <T>(schema: z.ZodType<T>) =>
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(request.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Formatted errors from zod error
        const formattedErrors = fromError(error).details.map(
          ({ message, code: type, path: [field] }) => ({
            field,
            type,
            message,
          }),
        );
        response.status(400).json({ errors: formattedErrors });
      }
    }
  };

export { validateSchema };
