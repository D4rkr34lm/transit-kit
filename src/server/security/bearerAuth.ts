import { Request } from "express";

export interface BearerAuthScheme<Caller = unknown> {
  type: "http";
  scheme: "bearer";
  validateCaller: (token: string) => Promise<Caller | null>;
}

export function createBearerAuthSchema<Caller>(
  validateCaller: (token: string) => Promise<Caller | null>,
): BearerAuthScheme<Caller> {
  return {
    type: "http",
    scheme: "bearer",
    validateCaller,
  };
}

export function buildBearerAuthenticator<Caller>(
  scheme: BearerAuthScheme<Caller>,
) {
  return async (request: Request): Promise<Caller | null> => {
    const authHeader = request.headers.authorization;

    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
      return null;
    }

    const token = authHeader.slice("Bearer ".length);
    return scheme.validateCaller(token);
  };
}
