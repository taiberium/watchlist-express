const securitiesRepository = require('../repository/SecuritiesRepository');
const QuoteMapper = require('../mapper/QuotesMapper');

const getQuotes =
    async (tickerArray, isRaw) => {
        const quotes = await securitiesRepository.getQuotes(tickerArray);
        const prettyQuotes = QuoteMapper.yahooQuotesMapper(quotes);
        const filteredKeysQuotes = QuoteMapper.filterAndMapQuoteKeys(prettyQuotes);
        return isRaw ? prettyQuotes : filteredKeysQuotes;
    };

const searchSecurities =
    async (searchString) => (await securitiesRepository.searchSecurities(searchString)).quotes;


module.exports.getQuotes = getQuotes;
module.exports.searchSecurities = searchSecurities;

