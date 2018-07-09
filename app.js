// spins up an express appliction
const express = require('express');
const app = express();

// HTTP request logger middleware
const morgan = require('morgan');

// require all routes
const eventRoutes = require('./api/routes/events');
const userRoutes = require('./api/routes/users');

// sets up a log middleware - call the routes function next
app.use(morgan('dev'));

// sets up a route middleware
// an incoming request must pass here
app.use('/events',eventRoutes);
app.use('/users',userRoutes);

// handel every request that reaches this line
// no route was able to handle this request
app.use((req,res,next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

// handle all kinds of errors the 404
// or any other error thrown by the application
// like 500 that will throw automatically an error object
app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({
      error:{
        message:error.message
      }
    });
});


module.exports = app;
