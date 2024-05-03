FROM node:18-bullseye as bot
WORKDIR /app
COPY package*.json ./
RUN npm i
# Instalar dockerize
RUN apt-get update && apt-get install -y wget && \
    wget https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz && \
    tar -C /usr/local/bin -xzvf dockerize-linux-amd64-v0.6.1.tar.gz && \
    rm dockerize-linux-amd64-v0.6.1.tar.gz && \
    npm install @google/generative-ai

COPY . .
ARG PUBLIC_URL
ARG PORT
CMD dockerize -wait tcp://mongo:27017 -timeout 30s npm start

