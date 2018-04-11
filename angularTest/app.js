var express = require("express");
var request = require("request");
var app = express();
var obj;

app.use(express.static('public'))
app.set("view-engine", "ejs");
app.engine('html', require('ejs').renderFile);

app.get('/fakeapi', function(req, res, next) {

  res.json({
    version: "-1.0",
    ip: "10.101.1.85",
    mac: "00:21:29:E9:50:C8",
    online: "0",
    timeleft: "12123123",
    authenticated: "0",
    throttled: "0",
    userclass: "2",
    expires: "Never",
    timeused: "939",
    data_downloaded_used: "",
    data_uploaded_used: "",
    data_total_used: "52428800",
    data_download_limit: "0",
    data_upload_limit: "0",
    data_total_limit: "104857600",
    bandwidth_download_limit: "125000",
    bandwidth_upload_limit: "5000000"
    });

});

app.get('/api', function(req, res, next) {

  request("https://www.ombord.info/api/jsonp/user", function(error, response, body) {
    var result = response.body.substring(1, response.body.length-3);
    obj = JSON.parse(result);
  });
  res.json(obj);

});

app.get("/", function(req, res, next) {
  res.render("login.html");
});

/*
app.get("/", function(req, res, next) {

  request("https://www.ombord.info/api/jsonp/user", function(error, response, body) {
    var result = response.body.substring(1, response.body.length-3);
    obj = JSON.parse(result);
  });
  next();
*/


/*
app.get('/', function(req, res, next) {

  request("http://localhost:1337/fakeapi/", function(error, response, body) {
    var result = response.body;
    obj = JSON.parse(result);

  });
  next();

}, function(req, res, next) {

  if (obj.authenticated==="0") {
    res.render("login.html", obj);
  }
  else {
    next();
  }
}, function(req, res, next) {

  if (obj.authenticated==="1") {
    res.render("loggedin.html", obj);
  }
  else {
    next();
  }
}, function(req, res, next) {
  res.send("Funkar inte");
});
*/

app.listen(1337, function(req, res) {
  console.log("App running on port 1337");
});
