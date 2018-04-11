var express = require('express');
var http = require('http');
var https = require('https');
var app = express();

app.get('/', function(req, res, next) {
  res.send("Hej");
});

app.listen(1339, function() {
  console.log("Listening on port 1339");
});
