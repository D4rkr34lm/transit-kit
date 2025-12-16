import { describe, it } from "vitest";
import { createServer } from "../../server";
import { createApiEndpointHandler } from "./createApiHandler";

import testRequest from "supertest";
import z from "zod";

describe("createApiHandler", () => {
  it("can create an API handler", () => {
    const endpoint = createApiEndpointHandler(
      {
        meta: {
          name: "",
          description: "",
          group: "",
        },
        method: "get",
        path: "/test",
        requestBodySchema: z.string(),
        responseSchemas: {
          200: {},
        },
      },
      async () => {
        return {
          code: 200,
        };
      },
    );

    const server = createServer({
      inDevMode: true,
      port: 3000,
      logger: false,
    });

    server.registerApiEndpoint(endpoint);

    testRequest(server.expressApp).get("/test").expect(200);
  });
});
