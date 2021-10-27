FROM node:14-slim

# Create app directory
WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]