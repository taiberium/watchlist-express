const Express = require('express');
const YahooRepository = require('../api/YahooQuoteRepository');
const QuoteMapper = require('../mapper/QuotesMapper');

const router = Express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
    const isRaw = req.query.raw;
    const tickerRequestParam = req.query.ticker;
    const tickers = Array.isArray(tickerRequestParam) ? tickerRequestParam : [tickerRequestParam];
    const quotesPromise = YahooRepository.getQuotes(tickers);
    quotesPromise
        .then((quotes) => {
            const prettyQuotes = QuoteMapper.yahooQuotesMapper(quotes);
            const filteredKeysQuotes = QuoteMapper.filterAndMapQuoteKeys(prettyQuotes);
            res.send(isRaw? prettyQuotes : filteredKeysQuotes);
        })
        .catch((e) => {
            const errorMessage = String(e);
            console.log(errorMessage);
            res.status(500).send({message: errorMessage})
        })
});

module.exports = router;
