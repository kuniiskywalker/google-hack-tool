import os
import diffbot
import hug

from datetime import datetime, timedelta

import redis
r = redis.Redis(host='redis', port=6379, db=0)

@hug.get('/echo', versions=1)
def echo(url):
    cache = r.hvals(url)
    if len(cache) > 0:
       json_result = cache
    else:
      r.delete(url)
      json_result = diffbot.article(url, token=os.environ["DIFFBOT_TOKEN"])
      r.hmset(url, json_result) 
      r.expire(url, 3600) 

    return json_result['objects'][0]['html']
