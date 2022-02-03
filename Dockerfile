### STAGE 1: Build ###
FROM node:14 as node

COPY /contact-manager/package.json /contact-manager/package-lock.json ./

RUN npm ci && mkdir /app && mv ./node_modules ./app

WORKDIR /app

COPY contact-manager/ /app/

RUN npm run launch

## STAGE 2: Server Rendering ##

FROM node:14

WORKDIR /app

COPY /contact-manager/package.json /contact-manager/package-lock.json ./

RUN npm ci

COPY /contact-manager/server/ /app/

COPY --from=node /app/dist /app/public

EXPOSE 3000
EXPOSE 8000
EXPOSE 27017

CMD ["node", "/app/public/api/bin/www"]
