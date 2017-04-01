var express = require('express');
var request = require('request');
var rp = require('request-promise');
var router = express.Router();

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
      res.render('index', {list: json.searchApi.documents});
  });


});

router.get('/product/:id', function(req, res, next) {

  var skuId = req.params.id;
  console.log(skuId);

  //res.render('index', {restaurant: response.jsonBody.businesses[0]});


});

module.exports = router;
