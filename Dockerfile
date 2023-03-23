FROM node:16

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npm run install
EXPOSE 8080

CMD [ "npm", "run","start:prod" ]