FROM node:10.15.3
WORKDIR /app
COPY package.json /app
COPY setting/ /app/setting
# RUN apk --no-cache --virtual build-dependencies add \
#   python \
#   make \
#   g++ \
#   && npm install \
#   && apk del build-dependencies
RUN npm install
COPY . /app
CMD ["sh", "./scripts/cmd.sh"]