#!/bin/bash
set -e

echo "🔧 Compilazione con make..."

# Pulisci prima
make clean

# Controlla se ci sono file sorgente
if [ ! -f "src/"*.cpp ] && [ ! -f "src/"*.c ]; then
    echo "❌ Nessun file sorgente trovato in src/"
    exit 1
fi

# Controlla se ci sono file di test
if [ ! -f "test/"*.cpp ] && [ ! -f "test/"*.c ]; then
    echo "❌ Nessun file di test trovato in test/"
    exit 1
fi

# Prova a compilare
if ! make; then
    echo "❌ Compilazione fallita"
    exit 1
fi

if [ ! -f ./test_exec ]; then
    echo "❌ Compilazione fallita: ./test_exec non trovato"
    exit 1
fi

echo "✅ Compilazione riuscita"

echo "🧪 Esecuzione test con misurazione risorse..."
if /usr/bin/time -v ./test_exec > output.log 2>&1; then
    echo "✅ Test eseguiti con successo"
    cat output.log
else
    echo "❌ Test falliti"
    cat output.log
    exit 1
fi