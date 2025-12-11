import express, { Application } from "express";
import { ZodType } from "zod";
import { ApiEndpointHandler } from "./handlers/apiHandler";
import {
  createBodyValidatorMiddleware,
  createQueryValidatorMiddleware,
} from "./middleware/validation";
import { isWithValue } from "./utils/types";

export interface ServerOptions {
  port?: number;
}
export interface Server {
  _expressApp: Application;
  start: () => void;
  registerApiEndpoint: (endpointHandler: ApiEndpointHandler) => void;
}

export function createServer(options: ServerOptions): Server {
  const { port = 3000 } = options;

  const app = express();

  return {
    _expressApp: app,
    start: () => {
      app.listen(port);
    },
    registerApiEndpoint: (endpointHandler) => {
      registerApiEndpoint(app, endpointHandler);
    },
  };
}

function registerApiEndpoint(
  expressApp: Application,
  endpointHandler: ApiEndpointHandler,
) {
  if (isWithValue<"querySchema", ZodType>("querySchema", endpointHandler)) {
    expressApp[endpointHandler.method](
      endpointHandler.path,
      createQueryValidatorMiddleware(endpointHandler.querySchema),
    );
  }

  if (
    isWithValue<"requestBodySchema", ZodType>(
      "requestBodySchema",
      endpointHandler,
    )
  ) {
    expressApp[endpointHandler.method](
      endpointHandler.path,
      createBodyValidatorMiddleware(endpointHandler.requestBodySchema),
    );
  }

  expressApp[endpointHandler.method](
    endpointHandler.path,
    endpointHandler.handler,
  );
}
