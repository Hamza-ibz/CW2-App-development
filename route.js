var express = require("express");
var app = express();
const cors = require('cors')
app.use(cors())
// Routes GET requests to /olivia to the request handler
app.get("/olivia", function(request, response) {
response.send("Welcome to Olivia’s homepage!");
});
// If you load something other than /olivia, serves a 404 error.
// If it is not a GET request, also servers a 404 error.
app.use(function(request, response) {
    // response.setHeader('Access-Control-Allow-Origin','*');
// response.status(404).send("u flopped");
response.send("u flopped");
});
// Starts the server on port 3000
app.listen(3000);
