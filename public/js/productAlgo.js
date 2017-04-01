var fs = require("fs");

// text file in string
var text = fs.readFileSync("../../cityData.txt", "utf-8");

var json = JSON.parse(text);

console.log(json);
