/**
 * This module configures and starts an express REST API server.
 */
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const connectDb = require('./config/db');
const logger = require('./config/log');
const publicationsRouter = require('./routes/publications');
const teamRouter = require('./routes/team');
const themeRouter = require('./routes/theme');

// Connect to the database
connectDb();

// Create and configure express server
const app = express();
const PORT = process.env.PORT || 5000;

// Use cors and express.json and cookie parser
app.use(cors());
app.use(express.json({ limit: '30mb', extended: true })); // express.json() parses requests with json payloads and uses "body-parser"
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cookieParser())

// "Welcome" route
app.get('/', (req, res) => res.send('You have reached the Researchify API'));

// Use the routes
app.use('/publications', publicationsRouter);
app.use('/team', teamRouter);
app.use('/theme', themeRouter);

// error handler middleware
// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
  const errorObject = err;
  console.log(errorObject);
  if (errorObject) {
    res.status(err.errorCode).json(err);
  } else {
    // if error object is not passed, server error
    res.status(500).send('Something went wrong in the backend that couldn\'t be handled!');
  }
});


// Listen for connections
app.listen(PORT, () => logger.info(`Server running on port: ${PORT}`));
