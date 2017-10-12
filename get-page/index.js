const { getSearchResult } = require('./api.js');

const fetch = require('node-fetch');
const sleep = require('sleep');
const striptags = require('striptags');

const keyword = process.argv[2];

var MongoClient = require("mongodb").MongoClient;
 
// 接続文字列
var db_host = "mongodb://mongodb:27017/test";

if (!keyword) {
  console.error('invlalid argument');
  return;
}

(async () => {
    const API_KEY = process.env.API_KEY;
    const SEARCH_ENGINE_KEY = process.env.SEARCH_ENGINE_KEY;
    const items = await getSearchResult(API_KEY, SEARCH_ENGINE_KEY, keyword, 30);
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

