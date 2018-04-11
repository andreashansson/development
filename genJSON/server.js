var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var modul = require('./modules/modules.js');
var fs = require('fs');

var exec = require('child_process').exec;
//var python = 'python3 chocolate/compile.py config/flixbus.json views/preview';

var shell = require('shelljs');

app.use(express.static('public'));
//app.use(express.static('views/preview/'));


app.use(bodyParser.urlencoded({ extended: false }))

app.set("view-engine", "ejs");
app.engine('html', require('ejs').renderFile);

app.get('/', function(req, res, next) {
  res.render("index.html");
});

app.get('/preview', function(req, res, next) {
  res.render("preview/index.html");
});

app.post("/newportal", function(req, res, next) {

  var map = modul.getValueFromCheckbox(req.body.map);
  var connectivity = modul.getValueFromCheckbox(req.body.connectivity);
  var tempLang2 = {}
  var langJSON;

  fs.readFile("public/json/languages.json", function(err, data) {
    var langString = data.toString();
    langJSON = JSON.parse(langString);
    var langKeys = Object.keys(langJSON.languages);
    var langs = req.body.languages;

    if (typeof langs === "string") {
      modul.createJSON(req.body.portalname, req.body.bgcolor, req.body.fgcolor, map, connectivity, langs, function() {
          console.log('/');
          shell.exec('python3 chocolate/compile.py config/' + req.body.portalname + '.json views/preview');
          console.log('/');
      });
    }

    else if (typeof langs === "object") {
      for (var i=0; i<langs.length; i++) {
        tempLang2[langs[i]] = langJSON.languages[langs[i]];
      }
      modul.createJSON(req.body.portalname, req.body.bgcolor, req.body.fgcolor, map, connectivity, tempLang2, function() {
        shell.exec('python3 chocolate/compile.py config/' + req.body.portalname + '.json views/preview');
      });
    }
  });

  res.redirect('/');

});


var port = process.env.port || 3000;
app.listen(port, function() {
  console.log("Server listening on port: " + port);
});
