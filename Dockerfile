FROM node:20.15.0-alpine

WORKDIR /news-app

COPY ./package*.json /news-app

RUN npm install

COPY . .

CMD ["npm","start"]