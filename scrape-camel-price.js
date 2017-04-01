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
      var productTitle = $(this).find("td.product_info>.product_title").text().trim();
      var amazonPrice = $(this).find("td.current_price.last>div.price_amazon").text().trim();
      var thirdPartyNewPrice = $(this).find("td.current_price.last>div.price_new").text().trim();

      resultObject = {
        "productTitle": productTitle,
        "lowestPrice": lowestPrice(amazonPrice, thirdPartyNewPrice)
      }
    });

    if (resultObject !== undefined) {
      return resultObject;
    } else {
      rp("https://ca.camelcamelcamel.com/search?sq=" + queryName).then(function($) {
        $("#products_list").find("tbody>tr").each(function() {
          var productTitle = $(this).find("td.product_info>.product_title").text().trim();
          var amazonPrice = $(this).find("td.current_price.last>div.price_amazon").text().trim();
          var thirdPartyNewPrice = $(this).find("td.current_price.last>div.price_new").text().trim();

          resultObject = {
            "productTitle": productTitle,
            "lowestPrice": lowestPrice(amazonPrice, thirdPartyNewPrice)
          }

          return resultObject;
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
