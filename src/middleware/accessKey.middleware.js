import express from "express";

/**
 * Middleware to authorize the requests based on the access key provided.
 * @param {string} key The key to check against
 * @returns {express.RequestHandler} The middleware handler function
 */
const accessKey = (key) => {
  return (req, res, next) => {
    const { authorization: reqKey } = req.headers;
    if (reqKey !== key) {
      return res.status(401).json({
        code: 401,
        type: "Unauthorized",
        message: null,
        errors: ["Invalid access key"],
        data: null,
      });
    }
    next();
  };
};

export default accessKey;
