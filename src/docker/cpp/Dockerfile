FROM gcc:latest

WORKDIR /app

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
    make \
    valgrind \
    time \
    libboost-test-dev \
    libboost-system-dev \
    libboost-filesystem-dev \
    wget \
    curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Installa Catch2 per i test che lo richiedono
RUN wget https://github.com/catchorg/Catch2/releases/download/v3.4.0/catch_amalgamated.hpp -O /usr/local/include/catch_amalgamated.hpp
RUN wget https://github.com/catchorg/Catch2/releases/download/v3.4.0/catch_amalgamated.cpp -O /usr/local/src/catch_amalgamated.cpp

# Crea una directory per catch.hpp (per compatibilità)
RUN mkdir -p /usr/local/include/test
RUN ln -s /usr/local/include/catch_amalgamated.hpp /usr/local/include/test/catch.hpp

COPY . .

ENTRYPOINT ["bash", "run.sh"]