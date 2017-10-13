FROM node:7.8

RUN apt-get update && apt-get -y upgrade

# Install app dependencies
COPY package.json /src/package.json
RUN cd /src; npm install --production

COPY api.js /src
COPY index.js /src

ENTRYPOINT ["node", "/src/index.js"]

