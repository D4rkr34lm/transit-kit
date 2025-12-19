import { Request, Response } from "express";

import { HttpStatusCodes } from "../../constants/HttpStatusCodes";
import { GenericResponse } from "./responses";

export type ApiEndpointHandler<
  PathParams extends Record<string, string> = {},
  RequestBody = unknown,
  Query = unknown,
  Responses extends GenericResponse = never,
  Caller = unknown,
> = (typedRequestData: {
  request: Request<
    PathParams,
    unknown,
    RequestBody,
    Query,
    Record<string, unknown>
  >;
  response: Response<unknown>;
  parameters: PathParams;
  query: Query;
  body: RequestBody;
  caller: Caller;
}) => Promise<
  | Responses
  | {
      code: (typeof HttpStatusCodes)["InternalServerError_500"];
    }
>;
