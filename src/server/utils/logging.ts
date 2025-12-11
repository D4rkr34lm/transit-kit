export type Logger = Pick<Console, "log" | "info" | "error" | "warn">;

export const NoOpLogger: Logger = {
  log: () => {},
  info: () => {},
  error: () => {},
  warn: () => {},
};

export const DefaultLogger: Logger = console;
