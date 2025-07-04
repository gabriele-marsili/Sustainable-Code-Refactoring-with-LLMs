FROM eclipse-temurin:21-jdk
WORKDIR /app

# Installa wget, unzip e time
RUN apt-get update && apt-get install -y wget unzip time

# Copia lo script di test
COPY run.sh .

ENTRYPOINT ["bash", "run.sh"]
