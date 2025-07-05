FROM gcc:latest
WORKDIR /app
RUN apt-get update && apt-get install -y \
    make \
    valgrind \
    time
ENTRYPOINT ["bash", "run.sh"]
