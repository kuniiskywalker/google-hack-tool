const { getSearchResult } = require('./api.js');

const fetch = require('node-fetch');
const sleep = require('sleep');
const striptags = require('striptags');

const keyword = process.argv[2];

const MongoClient = require("mongodb").MongoClient;
 
const db_host = "mongodb://mongodb:27017/test";

if (!keyword) {
  console.error('invlalid argument');
  return;
}

const limit = 30;

(async () => {
    const items = await getSearchResult(keyword, limit);
    const list = await Promise.all(items.map(async item => {

        try {
         
            const url = "http://get-body:8000/v1/echo?url=" + item.url;
            const res = await fetch(url);
            const html = await res.text();
            const body = striptags(html);

            await sleep.sleep(5);

            return {
                http_status: res.status,
                title: item.title,
                rank: item.rank,
                url: item.url,
                body: body
            }
        } catch(e) {
            return {
                http_status: 500,
                title: item.title,
                rank: item.rank,
                url: item.url,
                body: ""
            };
	}
    }))
    // .filter(item => item.http_status == '200')
    const db = await MongoClient.connect(db_host);
    const collection = db.collection("sites");
    await collection.remove({search_keyword:{$eq: keyword}})
    list
    .forEach(item => {
        console.log(item);
        // if (item.http_status != 200) return;
        collection.insertOne({
            "title": item.title,
            "rank": item.rank,
            "url": item.url,
            "search_keyword": keyword,
            "body": item.body,
            "created_at": new Date()
        }, (error, result) => {
            db.close();
        });
    }) 
    db.close();
})()

