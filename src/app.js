const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");
const userRouter = require("./routers/userRouter");
const testRouter = require("./routers/testRouter");
const seedRouter = require("./routers/seedRouter");

const app = express();

// set api limit using rateLimiter
const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 100, // set to 1 minute
  max: 5, // max 5 request
  message: "Too many request! Please try again later.",
});

// middleware
app.use(morgan("dev"));
app.use(rateLimiter);
app.use(xssClean());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routers
app.use("/api/users", userRouter);
app.use("/api/seed", seedRouter);
app.use("/test", testRouter);

// client error handling
app.use((req, res, next) => {
  res.status(404).send({
    message: "Route not found!",
  });
  createError(404, "Route not found!");
  next();
});

// server error handling
app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });
});

module.exports = app;
