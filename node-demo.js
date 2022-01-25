// var http = require("http"); // Requires the builtin http module
// // Defines a function that’ll handle incoming HTTP requests
// function requestHandler(request, response) {
// console.log("In comes a request to: " + request.url);
// response.end("Hello from node.js server");
// }
// // Creates a server that uses your function to handle requests
// var server = http.createServer(requestHandler);
// // Starts the server listening on port 3000
// server.listen(3000);


const express = require("express"); // Requires the Express module
// const http = require('http');
// Calls the express function to start a new Express application
const app = express();
// app.use(function(request, response) { // middleware
// console.log("In comes a request to: " + request.url);
// response.end("Hello, world!");
// });
// http.createServer(app).listen(3000); // start the server

// the same logging middleware as before

// Requires the modules needed
var path = require("path");
var fs = require("fs");

app.use(function(req, res, next) {
// Uses path.join to find the path where the file should be
var filePath = path.join(__dirname,"static", req.url);
// Built-in fs.stat gets info about a file
fs.stat(filePath, function(err, fileInfo) {
if (err) {
next();
return;
}
if (fileInfo.isFile()) res.sendFile(filePath);
else next();
});
});

// There is no 'next' argument because this is the last middleware.
app.use(function(req, res) {
    // Sets the status code to 404
    res.status(404);
    // Sends the error "File not found!”
    res.send("File not found!");
    });

app.use(function(request, response, next) {
    console.log("In comes a " + request.method + " to " + request.url);
    next();
    });
    app.use(function(request, response, next) {
    var minute = (new Date()).getMinutes();
    if ((minute % 2) === 0) { // continue if it is on a even minute
    next();
    } else { // otherwise responds with an error code and stops
    response.statusCode = 403;
    response.end("Not authorized.");
    }
    });
    app.use(function(request, response) { // only run if authorised
    response.end('Secret info: the password is "swordfish"!');
    });
    
    
    // http.createServer(app).listen(3000); // start the server

    // Starts the app on port 3000 and display a message when it’s started
app.listen(3000, function() {
    console.log("App started on port 3000");
    });