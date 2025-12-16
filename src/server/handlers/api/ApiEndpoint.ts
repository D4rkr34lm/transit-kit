import z from "zod";
import { HttpMethod } from "../../constants/HttpMethods";
import { ApiEndpointDefinition } from "./EndpointDefinition";
import { HandlerForDefinition } from "./HandlerFromDefinition";
import { GenericResponseSchemaMap } from "./responses";

export interface ApiEndpoint<
  Path extends string = string,
  Method extends HttpMethod = HttpMethod,
  RequestBody extends z.ZodType | undefined = undefined | z.ZodType,
  Query extends z.ZodType | undefined = undefined | z.ZodType,
  ResponseMap extends GenericResponseSchemaMap = GenericResponseSchemaMap,
  Handler extends HandlerForDefinition<Path, RequestBody, Query, ResponseMap> =
    HandlerForDefinition<Path, RequestBody, Query, ResponseMap>,
> {
  definition: ApiEndpointDefinition<
    Path,
    Method,
    RequestBody,
    Query,
    ResponseMap
  >;
  handler: Handler;
}
