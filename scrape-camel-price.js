var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var product = "macbook+pro"

request("https://ca.camelcamelcamel.com/search?sq=" + product, function(error, response, body) {
  if(error) {
    console.log("Error: " + error);
  }
  console.log("Status code: " + response.statusCode);

  var $ = cheerio.load(body);

  $("#products_list").find("tbody>tr").each(function() {
    var productTitle = $(this).find("td.product_info>.product_title").text().trim();
    var amazonPrice = $(this).find("td.current_price.last>div.price_amazon").text().trim();
    var thirdPartyNew = $(this).find("td.current_price.last>div.price_new").text().trim();

    console.log("Product title: " + productTitle);
    console.log("Amazon price: " + amazonPrice);
    console.log("Third Party New price: " + thirdPartyNew);
  });

});
