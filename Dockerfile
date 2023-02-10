# syntax=docker/dockerfile:1

FROM node:16

WORKDIR /app

COPY ["package.json", "./"]
RUN rm -rf /app
COPY ["dist", "./"]

COPY . .

RUN yarn install
RUN yarn build

RUN apt-get update
RUN apt-get install -y chromium

EXPOSE 3005

CMD [ "node", "dist/server.js" ]