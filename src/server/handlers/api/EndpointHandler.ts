import { Request } from "express";

import { HttpStatusCodes } from "../../constants/HttpStatusCodes";
import { GenericResponse } from "./responses";

export type ApiEndpointHandler<
  PathParams extends Record<string, string> = {},
  RequestBody = unknown,
  Query = unknown,
  Responses extends GenericResponse = never,
  Caller = unknown,
> = (
  request: Request<
    PathParams,
    unknown,
    RequestBody,
    Query,
    Record<string, unknown>
  >,
  extractedRequestData: {
    parameters: PathParams;
    query: Query;
    body: RequestBody;
    caller: Caller;
  },
) => Promise<
  | Responses
  | {
      code: (typeof HttpStatusCodes)["InternalServerError_500"];
    }
>;
