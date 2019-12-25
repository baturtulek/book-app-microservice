
FROM node:12-alpine

WORKDIR /srv

COPY . .

RUN npm ci

ENV USER_API "http://localhost:2000"
ENV DB_CONNECTION "mongodb+srv://adminovski:bookproject@node-books-bj7w3.mongodb.net/bookdb?retryWrites=true&w=majority"
ENV NODE_ENV development
ENV PORT 2001

EXPOSE $PORT

ENTRYPOINT ["node", "src/index.js"]
