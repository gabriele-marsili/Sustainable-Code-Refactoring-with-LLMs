FROM ubuntu:22.04

RUN apt-get update && apt-get install -y \
    gcc \
    make \
    cmake \
    valgrind \
    time \
    python3 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copia il wrapper e il Makefile universale
COPY time_wrapper.py /usr/local/bin/time_wrapper.py
COPY Makefile.universal /usr/local/share/Makefile.universal
RUN chmod +x /usr/local/bin/time_wrapper.py