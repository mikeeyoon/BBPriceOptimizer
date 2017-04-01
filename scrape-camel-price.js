var request = require('request');
var cheerio = require('cheerio');
var rp = require('request-promise');

var resultObject;

// scrapes price of given product name
// if model number result is null, trys to search with product name
function getCamelPrice(productModel, productName) {
  var queryName = productName.replace(" ", "+");

  rp("https://ca.camelcamelcamel.com/search?sq=" + productModel).then(function($) {
    $("#products_list").find("tbody>tr").each(function() {
      var amazonPrice = $(this).find("td.current_price.last>div.price_amazon").text().trim();
      var thirdPartyNewPrice = $(this).find("td.current_price.last>div.price_new").text().trim();

      resultObject = {
        "lowestPrice": lowestPrice(amazonPrice, thirdPartyNewPrice)
      }
    });

    if (resultObject !== undefined) {
      return resultObject;
    } else {
      rp("https://ca.camelcamelcamel.com/search?sq=" + queryName).then(function($) {
        $("#watchforms>table").find("tbody>tr>td").each(function() {
          var amazonPrice = $(this).find("span.black").text().trim();
          var thirdPartyNewPrice = $(this).find("td.white-space:nowrap>span.black").text().trim();

        var lowestPrice = lowestPrice(amazonPrice, thirdPartyNewPrice)

          return lowestPrice;
        });
      })
    }
  })
}

// helper function to calculate the lowest price
function lowestPrice(price1, price2) {
  if (price1 === "Not in Stock" && price2 !== "Not in Stock") {
    return price2;
  }

  if (price1 !== "Not in Stock" && price2 === "Not in Stock") {
    return price1;
  }

  if (price1 < price2) {
    return price1;
  } else if (price2 < price1) {
    return price2;
  } else if (price1 === price2) {
    return price1;
  }
}
