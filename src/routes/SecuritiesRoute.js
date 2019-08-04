const Express = require('express');
const SecurityService = require('../service/SecuritiesService');

const router = Express.Router();

function errorHandling(e, res) {
    const errorMessage = String(e);
    console.log(errorMessage);
    res.status(500).send({message: errorMessage})
}

function promiseResponseHandling(promise, res) {
    promise
        .then(result => res.send(result))
        .catch((e) => errorHandling(e, res));
}

/* GET users listing. */

router.get('/', (req, res) => {
    const isRaw = req.query.raw;
    const tickers = getTickers(req);
    const quotesPromise = SecurityService.getQuotes(tickers, isRaw);
    promiseResponseHandling(quotesPromise, res);
});

function getTickers(req) {
    const tickerRequestParam = req.query.ticker;
    return Array.isArray(tickerRequestParam) ? tickerRequestParam : [tickerRequestParam];
}

router.get('/search/:query', (req, res) => {
    const q = req.params.query;
    const securitiesPromise = SecurityService.searchSecurities(q);
    promiseResponseHandling(securitiesPromise, res);
});

module.exports = router;
