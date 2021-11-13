### STAGE 1: Build ###
FROM node:14 as node

COPY package.json package-lock.json ./

RUN npm ci && mkdir /app && mv ./node_modules ./app

WORKDIR /app

COPY . /app/

RUN npm run launch

## STAGE 2: Express ##

FROM node:14

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY /server/ /app/

COPY --from=node /app/dist /app/public

EXPOSE 3000
EXPOSE 8000
EXPOSE 27017

CMD ["node", "/app/public/api/bin/www"]
