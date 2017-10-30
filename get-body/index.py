import os
import hug

import html2text

import urllib.request

# import requests
from readability import Document

from datetime import datetime, timedelta

import redis
r = redis.Redis(host='redis', port=6379, db=0)

@hug.get('/echo', versions=1)
def echo(url):
    # response = requests.get(url)
    # html = response.text
    html = urllib.request.urlopen(url).read()
    doc = Document(html.decode('utf8'))
    # doc = Document(html)
    summary = doc.summary()
    text = html2text.html2text(summary)
    return text
