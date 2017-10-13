
# coding: utf-8

import sys

import pymongo

from janome.tokenizer import Tokenizer
from gensim.models import word2vec
import re

args = sys.argv

keyword = args[1]

# mongodb へのアクセスを確立
client = pymongo.MongoClient('mongodb', 27017)

db = client.test

db.sites

collection = db.sites

result = collection.find( { 'search_keyword': { '$eq': keyword } } )

lines = list( filter(lambda data:data["rank"] is not None, result) )
lines = list( filter(lambda data: re.match(r"https://ja.wikipedia", data["url"]) is None, lines) )

# # タイトルの特徴量検出

for line in lines:
    print(line["title"])

t = Tokenizer()

worddic = {}

for line in lines:
    malist = t.tokenize(line["title"])
    for w in malist:
        word = w.surface
        part = w.part_of_speech
        if part.find('名詞') < 0: 
            continue
        if not word in worddic:
            worddic[word] = 0
        worddic[word] += 1   

keys = sorted(worddic.items(),key = lambda x:x[1], reverse=True)
for word,cnt in keys:
    print("{0}({1})\n".format(word,cnt), end="")

# # 本文の特徴量検出

t = Tokenizer()

worddic = {}
for line in lines:
    malist = t.tokenize(line["body"])
    for w in malist:
        word = w.surface
        part = w.part_of_speech
        if part.find('名詞') < 0: 
            continue
        if not word in worddic:
            worddic[word] = 0
        worddic[word] += 1   

keys = sorted(worddic.items(),key = lambda x:x[1], reverse=True)
for word,cnt in keys:
    print("{0}({1})\n".format(word,cnt), end="")

results = []
for line in lines:
    s = line["body"]
    tokens = t.tokenize(s)
    
    r = []
    for token in tokens:
        if token.base_form == "*":
            w = token.surface
        else:
            w = token.base_form
        ps = token.part_of_speech
        hinshi = ps.split(',')[0]
    
        if hinshi in ['名詞', '形容詞', '動詞', '記号']:
            r.append(w)
    rl = (" ".join(r)).strip()
    results.append(rl)
    print(rl)

