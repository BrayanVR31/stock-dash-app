FROM node:22.10.0-alpine3.20 AS build
WORKDIR /usr/share/app

COPY package*.json .
RUN npm install

COPY . .
EXPOSE 3000

CMD ["npm","run","dev"]
