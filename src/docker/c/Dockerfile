FROM gcc:latest
WORKDIR /app
RUN apt-get update && apt-get install -y make valgrind
ENTRYPOINT ["bash", "run.sh"]
