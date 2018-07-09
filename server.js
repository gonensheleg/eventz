// import from node http package
const http = require('http');
const app = require('./app');
// set port at which project should run defalt 3000
const port = process.env.PORT || 3000;
// create a server - pass a listener to handle the requests
const server = http.createServer(app);
// start server
server.listen(port);
