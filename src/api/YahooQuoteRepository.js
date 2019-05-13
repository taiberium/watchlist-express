const yahooFinance = require('yahoo-finance');

const getQuotes =
    (quoteTickerArray) =>
        yahooFinance.quote({
            symbols: quoteTickerArray,
            modules: ['price', 'summaryDetail', 'defaultKeyStatistics']
        });

module.exports.getQuotes = getQuotes;
