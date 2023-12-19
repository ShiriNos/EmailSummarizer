FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV SERVER_PORT=8080

EXPOSE $SERVER_PORT


CMD [ "npm", "start"]