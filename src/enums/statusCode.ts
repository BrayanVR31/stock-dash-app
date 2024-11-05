// Standard web server status codes
export enum SERVER_STATUS_CODE {
  "OK" = 200,
  "BAD_REQUEST" = 400,
  "NOT_FOUND" = 404,
  "CREATED" = 201,
  "INTERNAL_SERVER_ERROR" = 500,
  "UNAUTHORIZED" = 401,
}

// Standard web server status code descriptions
export enum SERVER_STATUS_DESCRIPTION {
  "OK" = "The resource(s) was created with success, without errors",
  "BAD_REQUEST" = "Error to proccess incoming request or is an malformed request",
  "NOT_FOUND" = "The resource(s) don't exists or it's impossible to access it",
  "CREATED" = "The resource(s) was created successfully",
  "INTERNAL_SERVER_ERROR" = "The server detects an internal error, try again",
  "UNAUTHORIZED" = "Access denied, the credentials were incorrect or expire them",
}

// Authentication description
export enum AUTH_DESCRIPTION {
  "LOGIN_SUCCESS" = "Authentication successful, the credentials were validated without issue",
  "LOGOUT_SUCCESS" = "Logout successful, it's secure to leave the system",
}

// JWT description
export enum JWT_DESCRIPTION {
  "JWT_ERROR" = "The token is required to access any resource and it receives none",
}

// Standard database status codes
export enum DB_STATUS_CODE {
  "DOC_NOT_FOUND" = 404,
  "CAST_ID" = 400,
}

export enum DB_STATUS_DESCRIPTION {
  "DOC_NOT_FOUND" = "The document was not found or it doesn't exists in the collection",
  "CAST_ID" = "The string format isn't valid in object id field",
}
