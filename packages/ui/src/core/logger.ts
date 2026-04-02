type LogLevel = "debug" | "info" | "warn" | "error";

interface LogEvent {
  level: LogLevel;
  event: string;
  data?: Record<string, unknown>;
  error?: unknown;
  timestamp: string;
}

const isDev =
  typeof process !== "undefined" && process.env.NODE_ENV !== "production";

const format = (entry: LogEvent): string =>
  `[leeta:${entry.level.toUpperCase()}] ${entry.event}${
    entry.data ? " " + JSON.stringify(entry.data) : ""
  }`;

const send = (entry: LogEvent) => {
  if (isDev) {
    const fn =
      entry.level === "error"
        ? console.error
        : entry.level === "warn"
          ? console.warn
          : console.log;
    fn(format(entry), entry.error ?? "");
  }
};

export const logger = {
  debug: (event: string, data?: Record<string, unknown>) =>
    send({ level: "debug", event, data, timestamp: new Date().toISOString() }),

  info: (event: string, data?: Record<string, unknown>) =>
    send({ level: "info", event, data, timestamp: new Date().toISOString() }),

  warn: (event: string, data?: Record<string, unknown>) =>
    send({ level: "warn", event, data, timestamp: new Date().toISOString() }),

  error: (event: string, error: unknown, data?: Record<string, unknown>) =>
    send({
      level: "error",
      event,
      error,
      data,
      timestamp: new Date().toISOString(),
    }),
};
