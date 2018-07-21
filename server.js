
// import from node http package
const http = require('http');
const app = require('./app');
const config = require('config');
// set port at which project should run defalt 3000
const port = config.get('appPort');
// create a server - pass a listener to handle the requests
const server = http.createServer(app);
// start server
server.listen(port);
