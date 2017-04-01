var express = require('express');
var request = require('request');
var rp = require('request-promise');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/search', function(req, res, next) {
  var query = req.query.thing
  var options = {
    uri: 'https://msi.bbycastatic.ca/mobile-si/si/v3/products/search?query=Xbox%20One%20S%20500GB%20Limited%20Edition%20Console%20-%20Blue',
    json: true
  }

  rp(options)
  .then(function(json) {
    console.log(json);
    console.log(JSON.stringify(json.searchApi.documents));
  });
});

module.exports = router;
