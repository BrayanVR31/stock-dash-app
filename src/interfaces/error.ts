interface ServerError extends Error {
  statusCode: number;
  logging?: boolean;
  type?: string;
}

export type { ServerError };
