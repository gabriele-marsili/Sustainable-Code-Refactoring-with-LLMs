FROM gcc:latest

WORKDIR /app

ENV DEBIAN_FRONTEND=noninteractive

# Installa le dipendenze base
RUN apt-get update && apt-get install -y \
    make \
    g++ \
    libboost-test-dev \
    libboost-system-dev \
    libboost-filesystem-dev \
    pkg-config \
    wget \
    curl \
    valgrind \
    time \
    git \
    python3 \
    cmake \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Installa Catch2 (versione 3.x)
RUN cd /tmp && \
    git clone https://github.com/catchorg/Catch2.git && \
    cd Catch2 && \
    git checkout v3.4.0 && \
    cmake -B build -S . -DBUILD_TESTING=OFF && \
    cmake --build build/ --target install && \
    cd / && rm -rf /tmp/Catch2

# Verifica l'installazione (utile per debugging)
RUN ls -l /usr/include/boost/test/unit_test.hpp || echo "Boost.Test header not found"
RUN ls -l /usr/lib/x86_64-linux-gnu/libboost_unit_test_framework.so || echo "Boost.Test library not found"
RUN ls -l /usr/local/include/catch2/catch_all.hpp || echo "Catch2 header not found"

# Aggiorna ldconfig per assicurarsi che le librerie siano trovate
RUN ldconfig

# Copia i file di configurazione
COPY . .
COPY time_wrapper.py /usr/local/bin/time_wrapper.py

RUN chmod +x /usr/local/bin/time_wrapper.py

#ENTRYPOINT ["bash", "run.sh"]