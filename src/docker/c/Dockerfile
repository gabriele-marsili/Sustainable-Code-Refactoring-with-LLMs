FROM ubuntu:22.04

RUN apt-get update && apt-get install -y \
    gcc \
    make \
    valgrind \
    time \
    python3 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copia il wrapper
COPY time_wrapper.py /usr/local/bin/time_wrapper.py
RUN chmod +x /usr/local/bin/time_wrapper.py