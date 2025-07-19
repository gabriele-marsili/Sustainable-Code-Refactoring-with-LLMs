#!/bin/bash
set -e

echo "🔧 Compilazione con make..."

# Pulisci prima
make clean

# Controlla se ci sono file sorgente (correzione della sintassi)
if ! ls src/*.cpp >/dev/null 2>&1 && ! ls src/*.c >/dev/null 2>&1; then
    echo "❌ Nessun file sorgente trovato in src/"
    touch output.log
    exit 1
fi

# Controlla se ci sono file di test (correzione della sintassi)
if ! ls test/*.cpp >/dev/null 2>&1 && ! ls test/*.c >/dev/null 2>&1; then
    echo "❌ Nessun file di test trovato in test/"
    touch output.log
    exit 1
fi

# Prova a compilare
if ! make; then
    echo "❌ Compilazione fallita"
    touch output.log
    exit 1
fi

if [ ! -f ./test_exec ]; then
    echo "❌ Compilazione fallita: ./test_exec non trovato"
    touch output.log
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