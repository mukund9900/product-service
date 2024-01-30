"use strict";

class CustomError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

const handleNotFoundError = (message = "Not Found") => {
  return new CustomError(404, message);
};

const handleUnauthorizedError = (message = "Unauthorized") => {
  return new CustomError(401, message);
};

const handleForbiddenError = (message = "Forbidden") => {
  return new CustomError(403, message);
};

const handleInternalServerError = (message = "Internal Server Error") => {
  return new CustomError(500, message);
};
const BOOK_ERROR_MESSAGE = {
    
}

module.exports = {
  CustomError,
  handleNotFoundError,
  handleUnauthorizedError,
  handleForbiddenError,
  handleInternalServerError,
};
