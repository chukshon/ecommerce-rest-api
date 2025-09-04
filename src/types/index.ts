export enum ErrorCodes {
  USER_NOT_FOUND = 1001,
  USER_ALREADY_EXISTS = 1002,
  INCORRECT_PASSWORD = 1003,
  ADDRESS_NOT_FOUND = 1004,
  UNPROCESSABLE_ENTITY = 2001,
  INTERNAL_SERVER_ERROR = 3001,
  NOT_FOUND = 4001,
  UNAUTHORIZED = 4011,
}

export enum ErrorMessages {
  USER_NOT_FOUND = "User not found",
  ADDRESS_NOT_FOUND = "Address not found",
  USER_ALREADY_EXISTS = "User already exists",
  INCORRECT_PASSWORD = "Incorrect password",
  UNPROCESSABLE_ENTITY = "Unprocessable entity",
  INTERNAL_SERVER_ERROR = "Internal server error",
  NOT_FOUND = "Not found",
  UNAUTHORIZED = "Unauthorized",
  PRODUCT_NOT_FOUND = "Product not found",
}
