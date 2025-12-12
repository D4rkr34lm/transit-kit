import z from "zod";
import { HttpMethod } from "../../constants/HttpMethods";
import { GenericResponseSchemaMap } from "./responses/index";

export type ApiEndpointDefinition<
  Path extends string,
  Method extends HttpMethod,
  RequestBody extends z.ZodType | undefined,
  Query extends z.ZodType | undefined,
  ResponseMap extends GenericResponseSchemaMap,
> = {
  path: Path;
  method: Method;
  requestBodySchema?: RequestBody;
  querySchema?: Query;
  responseSchemas: ResponseMap;
};
