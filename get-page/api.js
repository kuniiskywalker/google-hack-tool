const google = require('googleapis');
const customsearch = google.customsearch('v1');

let http = require('http');

const search = (api_key, search_engine_key, keyword, num, start) => {
  return new Promise(function(resolve, reject){
    customsearch.cse.list({
      q: keyword,
      key: api_key,
      cx: search_engine_key,
      num: num,
      start: start
    }, (a,b,c) => {
      if (b && b.items) {
         resolve(b.items);
      } else {
         console.log(a);
         throw a;
      }
    })
  })
  .then(result => {
    return result.map((item, index) => {
      return {
        rank: index + start,
        title: item.title,
        url: item.link,
      }
    })
  })
}

module.exports.getSearchResult = async (api_key, search_engine_key, keyword, num=10) => {
  function* Factorial(max) {
    const limit = 10;
    let start = 1;
    while (start -1 < max) {
      num = start + limit - 1 > max? max - start + 1: limit;
      // num = start + limit > max? (start + limit) - max: limit;
      yield {number: num, start: start}
      start += limit
    }
  }
  let gen = Factorial(num);
  let promises = []
  for (let obj of gen) {
    promises.push(search(api_key, search_engine_key, keyword, obj.number, obj.start)); 
  }
  return Promise.all(promises)
    .then(results => {
       return [].concat.apply([], results); 
    })
}


