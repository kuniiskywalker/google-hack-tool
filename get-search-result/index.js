const { getSearchResult } = require('./api.js');
const client = require('redis').createClient({ host: 'redis', port: 6379 });
const http = require('http');
const url = require('url');

function getSearchCache(keyword, limit) {
  return new Promise((resolve, reject) => {
    client.hget(keyword, limit, (err, data) => {
      if(err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

http.createServer(async (req, res) => {
  try {
    const API_KEY = process.env.API_KEY;
    const SEARCH_ENGINE_KEY = process.env.SEARCH_ENGINE_KEY;

    const data = url.parse(req.url,true).query;
    const keyword = data.keyword;
    const limit = data.limit || 10;

    let items = await getSearchCache(keyword, limit);

    if(!items) {
      items = await getSearchResult(API_KEY, SEARCH_ENGINE_KEY, keyword, limit);
      client.hset(keyword, limit, JSON.stringify(items));
      client.expireat(keyword, parseInt((+new Date)/1000) + 86400);
    }

    res.writeHead(200, { 'Content-Type': 'application/json; charset=uft-8' });
    res.end(JSON.stringify(items));
  } catch (e) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end(JSON.stringify(e));
  }
}).listen(1337);
