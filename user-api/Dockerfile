
FROM node:12-alpine

WORKDIR /srv

COPY . .

RUN npm install

ENV DB_CONNECTION "mongodb+srv://adminovski:bookproject@node-books-bj7w3.mongodb.net/userdb?retryWrites=true&w=majority"
ENV NODE_ENV development
ENV PORT 2000

EXPOSE $PORT

ENTRYPOINT ["node", "src/index.js"]
