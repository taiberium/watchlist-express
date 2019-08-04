const yahooFinance = require('yahoo-finance');
const axios = require('axios');

const url = {
    //https://query1.finance.yahoo.com/v1/finance/search?q=T&quotesCount=6&newsCount=0
    //https://query2.finance.yahoo.com/v10/finance/quoteSummary/T?modules=price,summaryDetail
    searchApi: "https://query1.finance.yahoo.com/v1/finance/search"
};


const getQuotes =
    (quoteTickerArray) =>
        yahooFinance.quote({
            symbols: quoteTickerArray,
            modules: ['price', 'summaryDetail', 'defaultKeyStatistics']
        });

const searchSecurities =
    async (searchString) => {
        const quotes = await axios.get(url.searchApi, {params: {q: searchString}});
        return quotes.data;
    };

module.exports.getQuotes = getQuotes;
module.exports.searchSecurities = searchSecurities;
