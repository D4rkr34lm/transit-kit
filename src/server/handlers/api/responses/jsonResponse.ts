import z from "zod";
import { HttpStatusCode } from "../../../constants/HttpStatusCodes";
import { hasValue } from "../../../utils/typeGuards";

export interface JsonResponseSchema<DataSchema extends z.ZodType = z.ZodType> {
  dataType: "application/json";
  dataSchema: DataSchema;
}

export interface JsonResponse<
  Code extends HttpStatusCode = HttpStatusCode,
  Data = unknown,
> {
  code: Code;
  dataType: "application/json";
  json: Data;
}

export type JsonResponseSchemaToResponseType<
  Code extends HttpStatusCode,
  Schema extends JsonResponseSchema,
> =
  Schema extends JsonResponseSchema<infer DataSchema>
    ? JsonResponse<Code, z.infer<DataSchema>>
    : never;

export function isJsonResponseSchema(
  value: unknown,
): value is JsonResponseSchema {
  return (
    typeof value === "object" &&
    hasValue(value) &&
    "dataType" in value &&
    value.dataType === "application/json"
  );
}
export function isJsonResponse(value: unknown): value is JsonResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    "dataType" in value &&
    value.dataType === "application/json"
  );
}
