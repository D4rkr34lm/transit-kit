import {
  ClientErrorStatusCode,
  SuccessStatusCode,
} from "../../../constants/HttpStatusCodes";
import { EmptyResponse, EmptyResponseSchema } from "./emptyResponse";
import { JsonResponse, JsonResponseSchema } from "./jsonResponse";

export type GenericResponseSchemaMap = {
  [K in SuccessStatusCode | ClientErrorStatusCode]?:
    | EmptyResponseSchema
    | JsonResponseSchema
    | undefined;
};

export type GenericResponse = EmptyResponse | JsonResponse;
