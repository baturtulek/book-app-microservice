
FROM node:12-alpine

WORKDIR /srv

COPY . .

RUN npm ci

ENV USER_API "http://localhost:2000"
ENV BOOK_API "http://localhost:2001"
ENV NODE_ENV development
ENV PORT 2002

EXPOSE $PORT

ENTRYPOINT ["node", "src/index.js"]