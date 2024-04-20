FROM mcr.microsoft.com/playwright:focal AS base

COPY . /app

WORKDIR /app

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "dev" ]