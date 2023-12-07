FROM node:14

WORKDIR /app

COPY package*.json ./

RUN nmp install

COPY . .

ENV PORT=8080

EXPOSE 8080

CMD [ "npm", "start" ]