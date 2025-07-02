FROM eclipse-temurin:21-jdk
WORKDIR /app
COPY run.sh .
RUN apt-get update && apt-get install -y wget unzip

# Scarica JUnit platform
RUN wget -O junit-platform-console-standalone.jar \
  https://repo1.maven.org/maven2/org/junit/platform/junit-platform-console-standalone/1.10.0/junit-platform-console-standalone-1.10.0.jar

ENTRYPOINT ["bash", "run.sh"]
