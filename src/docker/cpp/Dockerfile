FROM gcc:latest

WORKDIR /app

ENV DEBIAN_FRONTEND=noninteractive

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
    # Aggiungi qui eventuali dipendenze specifiche per Catch2 se necessario,
    # ma sembra che tu stia usando Boost.Test per questo caso.
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Verifica l'installazione di Boost.Test
RUN ls -l /usr/include/boost/test/unit_test.hpp || true
RUN ls -l /usr/lib/x86_64-linux-gnu/libboost_unit_test_framework.so || true

# Aggiorna ldconfig per assicurarsi che le librerie Boost siano trovate
RUN ldconfig

# Non copiare i file prima di aver preparato l'ambiente
# La COPY . . deve avvenire DOPO l'installazione di tutte le dipendenze
# e la verifica dei percorsi.
COPY . .

ENTRYPOINT ["bash", "run.sh"]