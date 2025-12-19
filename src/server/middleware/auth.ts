import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { authenticate, SecurityScheme } from "../security/SecuritySchema";

export function buildAuthenticationMiddleware<Caller>(
  schemes: SecurityScheme<Caller>[],
) {
  return expressAsyncHandler(
    async (request: Request, response: Response, next: NextFunction) => {
      const caller = await authenticate(schemes, request);

      if (caller == null) {
        response.status(401).json({ message: "Unauthorized" });
        return;
      }
      response.locals.caller = caller;
      next();
    },
  );
}
