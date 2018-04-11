var express = require('express');
var http = require('http');
var https = require('https');
var app = express();

app.get('/api', function(req, res, next) {
  res.json({
    auth: '1',
    throttled: '0'
  });
});

app.listen(1340, function() {
  console.log("Listening on port 1340");
});
