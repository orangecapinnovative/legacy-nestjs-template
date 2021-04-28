FROM node:14.16.0-alpine

RUN mkdir -p /app
WORKDIR /app

COPY ./ /app/
ENV TZ=Asia/Bangkok

RUN npm install
RUN npm test
RUN npm run build

ENTRYPOINT ["/usr/local/bin/npm"]
