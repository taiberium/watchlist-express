var yahooFinance = require('yahoo-finance');

function getQuotes(quoteTickerArray) {
    return yahooFinance.quote({
        symbols: quoteTickerArray,
        modules: ['price', 'summaryDetail', 'defaultKeyStatistics']
    })
}

module.exports.getQuotes = getQuotes;


