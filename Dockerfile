FROM node:10.14.2-alpine
WORKDIR /app
COPY package.json /app
RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++ \
    && npm install \
    && apk del build-dependencies
COPY . /app
CMD ["sh", "./scripts/cmd.sh"]