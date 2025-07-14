FROM golang:1.21
WORKDIR /app

# Installa time e altri tool necessari
RUN apt-get update && apt-get install -y \
    time \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copia tutti i file Go
COPY . .

# Assicurati che run.sh sia eseguibile
RUN chmod +x run.sh

ENTRYPOINT ["bash", "run.sh"]