
import type {Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import type { ValidationError } from "express-validator";


export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
   
    const formattedErrors = errors.array().map((err) => {
      const e = err as ValidationError & { param?: string; msg: string };
      return {
        field: e.param || "unknown",
        message: e.msg,
      };
    });

    return res.status(400).json({
      success: false,
      errors: formattedErrors,
    });
  }

  next();
};
