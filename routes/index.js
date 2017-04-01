var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var rp = require('request-promise');
var router = express.Router();

var skuId;
var modelNumber;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/search', function(req, res, next) {
  var query = req.query.query
  var options = {
    uri: 'https://msi.bbycastatic.ca/mobile-si/si/v3/products/search',
    qs: {
      query: 'samsung+s7',
      lang: 'en'
    },
    json: true
  }
  rp(options)
  .then(function(json) {
    console.log(JSON.stringify(json.searchApi.documents[0].skuId));
  });
});

router.get('/product/:id', function(req, res, next) {
  var skuId = req.params.id;
  var model;
  var options = {
    uri: 'https://msi.bbycastatic.ca/mobile-si/si/v4/pdp/overview/' + skuId,
    json: true
  }
  rp(options)
  .then(function(json) {
    model = json.overview.manufacturerId.modelNumber;
    title = json.overview.names.short;
  })
  .then(function() {
    scrape_camel(model)
    .then(function(prices) {
      console.log(prices[0]);
      console.log(prices[1]);
    })
    .catch(function(e) {
      scrape_camel(title)
      .then(function(prices) {
        console.log(prices[0]);
        console.log(prices[1]);
      });
    });
  });
});

var scrape_camel = function(search_query) {
  return new Promise(function(resolve, reject) {
    request("https://ca.camelcamelcamel.com/search?sq=" + search_query, function(error, response, body) {
      if(error) {
        console.log("Error: " + error);
      }

      var $ = cheerio.load(body);

      var firstItem = $('td.current_price.last').first();
      if (firstItem.text().trim().length == 0) {
        reject();
      }
      var price_amazon = firstItem.find('.price_amazon').text().trim();
      var price_new = firstItem.find('.price_new').text().trim();
      resolve([price_amazon, price_new]);
    });
  });
}

module.exports = router;
