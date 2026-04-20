// helper/successHandler.js

/**
 * Handles 200 OK success responses
 */
const handle200 = (res, data = null, message = "Success") => {
  return res.status(200).json({
    status: true,
    message,
    data
  });
};

/**
 * Handles 201 Created success responses
 */
const handle201 = (res, data = null, message = "Resource created successfully") => {
  return res.status(201).json({
    status: true,
    message,
    data
  });
};

/**
 * Handles 204 No Content success responses
 */
const handle204 =  (res, message = "Resource delete successfully") => {
  return res.status(204).json({
    status: true,
    message,
  });
};

/**
 * Handles 400 Bad Request error responses
 */
const handle400 = (res, message = "Bad Request", error = null) => {
  const response = { status: false, message };
  if (error && process.env.NODE_ENV === 'development') response.error = error.message || error;
  return res.status(400).json(response);
};

/**
 * Handles 404 Not Found error responses
 */
const handle404 = (res, message = "Resource not found", error = null) => {
  const response = { status: false, message };
  if (error && process.env.NODE_ENV === 'development') response.error = error.message || error;
  return res.status(404).json(response);
};

/**
 * Handles 500 Internal Server Error responses
 */
const handle500 = (res, message = "Internal Server Error", error = null) => {
  const response = { status: false, message };
  if (error && process.env.NODE_ENV === 'development') response.error = error.message || error;
  return res.status(500).json(response);
};

module.exports = {
  handle200,
  handle201,
  handle204,
  handle400,
  handle404,
  handle500,
};