FROM node:20

# Aggiunge GNU time
RUN apt-get update && apt-get install -y time

WORKDIR /base
COPY package.json .
RUN npm install --include=dev

WORKDIR /app
COPY run.sh jest.config.js ./
ENTRYPOINT ["bash", "run.sh"]
