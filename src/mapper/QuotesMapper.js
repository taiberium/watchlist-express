const keysMapper = {

    // основные показатели
    pe: "trailingPE", // отношение цены актива к чистой прибыли актива (за какой период?)
    peg: "pegRatio", //?
    pb: "priceToBook", // отношение цены к расчетной стоймости актива (за какой период?)
    bookValue: "bookValue", // расчетная стоймость актива

    //описание актива
    name: "shortName",
    ticker: "symbol",
    type: "quoteType", // тип инструмента
    currency: "currency", //валюта инструмента

    // изменение цены
    dayChange: "regularMarketChange", //изменение за день в валюте инструмента
    percentDayChange: "regularMarketChangePercent", //изменение за день в процентах
    price: "regularMarketPrice",
    low52Week: "fiftyTwoWeekLow",
    high52Week: "fiftyTwoWeekHigh",
    highDay: "dayHigh",
    lowDay: "dayLow",

    //дивиденды
    dividend: "dividendRate",
    dividendPercent: "dividendYield",

};

const switchedKeysMapper = Object.entries(keysMapper)
    .reduce((acc, [key, value]) => ({...acc, [value]: key}), {});

function yahooQuotesMapper(yahooQuotesObject) {
    return Object.entries(yahooQuotesObject)
        .reduce((acc, [quoteTickerKey, quoteValue]) => {
            acc[quoteTickerKey] = getMergedObject(quoteValue);
            return acc;
        }, {})
}

function getMergedObject(object) {
    return Object.entries(object)
        .reduce((acc, [key, value]) => ({...acc, ...value}), {});
}

function filterAndMapQuoteKeys(prettyQuotes) {
   return Object.entries(prettyQuotes)
        .reduce((acc, [key, value]) => ({...acc, [key]: filterAndMapKeys(value)}), {});
}

function filterAndMapKeys(object) {
    return Object.entries(object)
        .filter(([key, value]) => switchedKeysMapper.hasOwnProperty(key))
        .reduce((acc, [key, value]) => ({...acc, [switchedKeysMapper[key]]: value}), {})
}

module.exports.yahooQuotesMapper = yahooQuotesMapper;
module.exports.filterAndMapQuoteKeys = filterAndMapQuoteKeys;
