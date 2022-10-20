const {
  esclient,
  index,
  type,
  indexStudents,
  typeStudents,
} = require("../../elastic");

async function getQuotes(req) {
  const query = {
    query: {
      match: {
        quote: {
          query: req.text,
          operator: "and",
          fuzziness: "auto",
        },
      },
    },
  };

  const {
    body: { hits },
  } = await esclient.search({
    from: req.page || 0,
    size: req.limit || 100,
    index: index,
    type: type,
    body: query,
  });

  const results = hits.total.value;
  const values = hits.hits.map((hit) => {
    return {
      id: hit._id,
      subject_code: hit._source.quote,
      subject_name: hit._source.author,
      score: hit._score,
    };
  });

  return {
    results,
    values,
  };
}

async function insertNewQuote(quote, author) {
  return esclient.index({
    index,
    type,
    body: {
      quote,
      author,
    },
  });
}

async function getQuotesStd(req) {
  const query = {
    query: {
      match: {
        quote: {
          query: req.text,
          operator: "and",
          fuzziness: "auto",
        },
      },
    },
  };

  const {
    body: { hits },
  } = await esclient.search({
    from: req.page || 0,
    size: req.limit || 100,
    indexStudents: indexStudents,
    typeStudents: typeStudents,
    body: query,
  });

  const results = hits.total.value;
  const values = hits.hits.map((hit) => {
    return {
      id: hit._id,
      subject_code: hit._source.quote,
      subject_name: hit._source.author,
      score: hit._score,
    };
  });

  return {
    results,
    values,
  };
}

async function insertNewQuoteStd(quote, author) {
  return esclient.indexStudents({
    indexStudents,
    typeStudents,
    body: {
      quote,
      author,
    },
  });
}

module.exports = {
  getQuotes,
  insertNewQuote,
  getQuotesStd,
  insertNewQuoteStd,
};
