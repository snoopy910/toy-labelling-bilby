FROM mcr.microsoft.com/playwright:focal

WORKDIR /app

COPY . .

RUN npm install

CMD [ "npm", "run", "dev" ]