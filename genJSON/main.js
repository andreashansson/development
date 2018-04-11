var fs = require('fs');

var name = "chocolate";
var bgcolor = "#319dd5";
var fgcolor = "#ffffff";
var emailLogin = true;
var lang = {"en": "English", "de": "Deutsche"}
var languages = lang;

var dataInput = {
  "name": name,
  "bgcolor": bgcolor,
  "fgcolor": fcolor,
  "email_login_field": emailLogin,
  "languages": languages
}

//var dataInput = { name: name, bgcolor: bgcolor, fcolor: fcolor, email_login_field: emailLogin }

var dataString = JSON.stringify(dataInput);

/*
stringify Test...
Enlig https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
borde jag få utskrifen '{}' men får {} vilket iofs är vad jag vill men ändå.

var test = JSON.stringify({});
console.log(test);
*/

var data = fs.readFile(name + ".json", function(err, data) {
  if(err) {
    //console.error(err);
    console.log("File doesn't exist.");
    console.log("New file is being created.");
    fs.writeFile(name + ".json", dataString, (err) => {
      if (err) throw err;
      console.log("File " + name + ".json created and saved.");
      console.log("File content:");
      console.log(dataString);
    });
  }
  else {
    //File exist but overwrites with new values.
    fs.writeFile(name + ".json", dataString, (err) => {
      if (err) throw err;
    });
    console.log(dataString);
  }
});
