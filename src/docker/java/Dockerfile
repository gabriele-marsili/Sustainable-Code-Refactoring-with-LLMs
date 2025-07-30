FROM eclipse-temurin:21-jdk
WORKDIR /app

RUN apt-get update && apt-get install -y wget unzip time

# Copia e rende eseguibile lo script di test
COPY run.sh .
RUN chmod +x run.sh

ENTRYPOINT ["bash", "run.sh"]
