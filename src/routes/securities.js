var Express = require('express');
var Repository = require('../api/quoteRepository');

var router = Express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
    var tickerRequestParam = req.query.ticker;
    var tickers = Array.isArray(tickerRequestParam)? tickerRequestParam: [tickerRequestParam] ;
    var quotesPromise = Repository.getQuotes(tickers);
    quotesPromise
        .then(function (quotes) {
            res.send(quotes);
        })
        .catch(function (e) {
            var errorMessage = String(e);
            console.log(errorMessage);
            res.status(500).send({message: errorMessage})
        })
});

module.exports = router;
