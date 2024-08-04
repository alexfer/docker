FROM node:20-alpine

RUN npm install -g nodemon

RUN mkdir -p /var/www/project/nodejs
WORKDIR /var/www/project/nodejs
COPY package.json .
RUN npm install

COPY . .

EXPOSE 8443

CMD ["node", "--env-file=.env", "index.js"]