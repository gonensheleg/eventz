// spins up an express appliction
const express = require('express');
const app = express();

// HTTP request logger middleware
const morgan = require('morgan');

// Handel the body post request
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// require all routes
const eventRoutes = require('./api/routes/events/events');
const userRoutes = require('./api/routes/users/users');

mongoose.connect('mongodb://localhost/eventz').then((value) => {
  console.log('Connected to MongoDb')
}).catch((err) => {
  console.error('Could not connected to MongoDb',err)
});

// sets up a log middleware - call the routes function next
app.use(morgan('dev'));

// sets a body-parser middleware to parse body data
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// solve the CORS Cross-Origin Resource Sharing error
// to set it only for my site use https://sitename.com instead of *
app.use((req,res,next) => {
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headrs',
  'Origin, X-Requested-with, Content-Type, Accept, Authorization');

  // the incoming request eq to options
  // a browser will always sand an options req (pre-flight) before other req
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

// sets up a route middleware
// an incoming request must pass here
app.use('/events/events',eventRoutes);
app.use('/users/users',userRoutes);

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
