#a imagem a ser utilizada
FROM node:12-alpine

#o caminho da pasta de trabalho
WORKDIR /app

#copia o arquivo package.json da raiz para o container
COPY package.json /app/package.json

#instala o vue cli
RUN npm install -g @vue/cli

#instala biblibotecas node
RUN npm install