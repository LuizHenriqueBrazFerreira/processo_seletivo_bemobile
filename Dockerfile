FROM node:20-alpine

COPY package*.json ./

## Cria a pasta do container e copia para dentro dela o package*.json
WORKDIR /app


RUN npm install
## Copia os demais arquivos para o container

COPY . .

EXPOSE 3001

ENTRYPOINT [ "npm", "run", "dev" ]