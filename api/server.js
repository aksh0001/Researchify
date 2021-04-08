/**
 * This module configures and starts an express REST API server.
 */
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDb = require('./config/db');
const fooRouter = require('./routes/foo');
const usersRouter = require('./routes/users');


// Connect to the database
connectDb();

// Create and configure express server
const app = express();
const PORT = process.env.PORT || 5000;

// Use cors and express.json
app.use(cors());
app.use(express.json({limit: "30mb", extended: true})); // express.json() parses requests with json payloads and uses "body-parser"
app.use(express.urlencoded({limit: "30mb", extended: true}));

// "Welcome" route
app.get('/', (req, res) => res.send('You have reached the Researchify API'));

// Use the routes
app.use('/foo', fooRouter);
app.use('/users', usersRouter);

// Listen for connections
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));