import { HttpStatusCode } from "../../../constants/HttpStatusCodes";

export interface EmptyResponseSchema {}

export interface EmptyResponse<Code extends HttpStatusCode = HttpStatusCode> {
  code: Code;
}

export type EmptyResponseSchemaToResponseType<
  Code extends HttpStatusCode,
  _ extends EmptyResponseSchema,
> = EmptyResponse<Code>;
