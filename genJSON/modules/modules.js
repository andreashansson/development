var fs = require('fs');

var getValueFromCheckbox = function(email) {

  if (email==="true") {
    return true;
  }
  else {
    return false;
  }
}

var createJSON = function(name, bgcolor, fgcolor, map, connectivity, lang, callback) {

  if (typeof lang==="object") {

    var dataInput = {
      "name": name,
      "bgcolor": bgcolor,
      "fgcolor": fgcolor,
      "languages": lang,
      "connectivity": connectivity,
      "map": map
    }
  }
  else {
    var dataInput = {
      "name": name,
      "bgcolor": bgcolor,
      "fgcolor": fgcolor,
      "default_language": lang,
      "connectivity": connectivity,
      "map": map
    }
  }

  var dataString = JSON.stringify(dataInput);

  return fs.writeFile("config/" + name + ".json", dataString, callback);
  
}

module.exports.createJSON = createJSON;
module.exports.getValueFromCheckbox = getValueFromCheckbox;
