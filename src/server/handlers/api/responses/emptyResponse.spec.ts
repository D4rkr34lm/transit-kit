import { describe, expectTypeOf, it } from "vitest";
import {
  EmptyResponseSchema,
  EmptyResponseSchemaToResponseType,
} from "./emptyResponse";

describe("empty response", () => {
  it("can correctly infer the response type from schema", () => {
    type Schema = {};

    type Inferred = EmptyResponseSchemaToResponseType<200, Schema>;

    type Expected = {
      code: 200;
    };

    expectTypeOf<Inferred>().toEqualTypeOf<Expected>();
  });

  it("can correctly identify a literal with the type", () => {
    type Schema = {};

    type Expected = EmptyResponseSchema;

    expectTypeOf<Schema>().toEqualTypeOf<Expected>();
  });
});
