FROM golang:1.21
WORKDIR /app
RUN apt-get update && apt-get install -y \
    time
ENTRYPOINT ["bash", "run.sh"]
