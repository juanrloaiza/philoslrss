FROM node:18.20-alpine3.19
ENV NODE_ENV production
# update and install dependency
RUN apk update && apk upgrade

WORKDIR /app
COPY . /app/
COPY package.json /app
COPY package-lock.json /app
RUN npm install

ENV NODE_ENV=production

RUN npm run build

EXPOSE 3000
CMD npm start