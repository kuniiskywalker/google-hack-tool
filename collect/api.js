const fetch = require('node-fetch');

module.exports.getSearchResult = async (keyword, limit=10) => {
  const url = 'http://get-search-result:1337?keyword=' + encodeURI(keyword) + '&limit=' + limit;
  const res = await fetch(url);
  const json = await res.json();
  return json;
}

