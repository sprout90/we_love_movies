if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();

// route definition constants
const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theatersRouter = require("./theaters/theaters.router");
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

// use statements
app.use(express.json());
app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);

// global use statements
app.use(notFound);
app.use(errorHandler);

// export app
module.exports = app;
