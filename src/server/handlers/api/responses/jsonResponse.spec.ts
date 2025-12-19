import { describe, expectTypeOf, it } from "vitest";
import z from "zod";
import {
  JsonResponseSchema,
  JsonResponseSchemaToResponseType,
} from "./jsonResponse";

describe("empty response", () => {
  it("can correctly infer the response type from schema", () => {
    type Schema = {
      dataType: "application/json";
      dataSchema: z.ZodString;
    };

    type Inferred = JsonResponseSchemaToResponseType<200, Schema>;

    type Expected = {
      code: 200;
      dataType: "application/json";
      json: string;
    };

    expectTypeOf<Inferred>().toEqualTypeOf<Expected>();
  });

  it("can correctly identify a literal with the type", () => {
    type Schema = {
      dataType: "application/json";
      dataSchema: z.ZodString;
    };

    type Expected = JsonResponseSchema<z.ZodString>;

    expectTypeOf<Schema>().toEqualTypeOf<Expected>();
  });
});
