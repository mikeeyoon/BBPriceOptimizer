var express = require('express');
var request = require('request');
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
    uri: 'https://msi.bbycastatic.ca/mobile-si/si/v3/products/search?query=' + query + '&storeId=&zipCode=&facetsOnly=&platform=&lang=en',
    json: true
  }


  rp(options)
  .then(function(json) {
    console.log(JSON.stringify(json.searchApi.documents[0].skuId));
  });


});

module.exports = router;
