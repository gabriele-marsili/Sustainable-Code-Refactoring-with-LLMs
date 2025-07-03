FROM node:20

WORKDIR /base

# Copia e installa una sola volta le dipendenze
COPY package.json .
RUN npm install --include=dev

WORKDIR /app
COPY run.sh jest.config.js ./
ENTRYPOINT ["bash", "run.sh"]
