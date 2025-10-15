#!/bin/bash
set -e

> output.log

echo "🧹 Pulizia file precedenti..."
make clean || true

echo "🔧 Compilazione con make..."

if ! make 2>&1 | tee -a output.log; then
    echo "❌ Compilazione fallita" | tee -a output.log
    exit 1
fi

if [ ! -f ./tests.out ]; then
    echo "❌ Compilazione fallita: ./tests.out non trovato" | tee -a output.log
    exit 1
fi

chmod +x ./tests.out

echo "🧪 Esecuzione test con misurazione risorse..."

# Usa Python wrapper per timing preciso al nanosecondo
if python3 /usr/local/bin/time_wrapper.py ./tests.out > output.log 2>&1; then
    echo "✅ Test eseguiti con successo"
else
    EXIT_CODE=$?
    echo "❌ Test falliti (exit code: $EXIT_CODE)" | tee -a output.log
    exit $EXIT_CODE
fi