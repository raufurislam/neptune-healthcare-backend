import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";

const validateRequest =
  (Schema: ZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Schema.parseAsync({
        body: req.body,
      });
      return next();
    } catch (err) {
      next(err);
    }
  };

export default validateRequest;
