google-hack-tool
====================
A tool to analyze google search results.

![summary](https://github.com/kuniiskywalker/google-hack-tool/blob/master/summary.jpg)

Set credential file
--------------------

Create an `.env` file with various authentication information in the root directory.

Please set the google authentication information of API_KEY, SEARCH_ENGINE_KEY with the following URL

https://console.developers.google.com/apis/credentials

Diffbot authentication information of DIFFBOT_TOKEN should be set with the following URL

https://www.diffbot.com/

```.env
API_KEY=hogehoge
SEARCH_ENGINE_KEY=fugafuga
DIFFBOT_TOKEN=hogefuga
```

Build docker image
--------------------

Create a Docker image

```
docker-compose build
```

Run a Container
--------------------

```
docker-compose up -d
```

Gather the results of google's search
--------------------

```
docker-compose run --rm collect "search word"
```

Analysis by jupyternotebook
--------------------

Access jupyternotebook

```
http://localhost:8888
```

Confirm the authentication token with the following command

```
docker-compose logs jupyter
```

Access mongodb
--------------------

```
docker-compose exec mongodb mongo admin
```

## mongodb

use db
```
use test
```

## show collections
```
show collections
```

## find collections
```
db.sites.find()
```

## create collection
```
db.createCollection("sites")

```

Execute body extraction alone
--------------------

```
curl http://localhost:8000/v1/echo?url={url}
```
