FROM node:lts-alpine
# FROM node:lts
WORKDIR /app
COPY package.json /app
COPY setting/ /app/setting
RUN apk --no-cache --virtual build-dependencies add \
  python \
  make \
  g++ \
  && npm install \
  && apk del build-dependencies
# RUN npm install
COPY . /app
CMD ["sh", "./scripts/cmd.sh"]