#!/bin/bash
set -e

> output.log

echo "🧹 Pulizia file precedenti..."
make clean || true

# Controlla se ci sono file sorgente
if ! ls src/*.cpp >/dev/null 2>&1 && ! ls src/*.c >/dev/null 2>&1; then
    echo "❌ Nessun file sorgente trovato in src/"
    echo "Directory contents:"
    ls -la src/ || echo "src/ directory not found"
    touch output.log
    exit 1
fi

# Controlla se ci sono file di test
if ! ls test/*.cpp >/dev/null 2>&1 && ! ls test/*.c >/dev/null 2>&1; then
    echo "❌ Nessun file di test trovato in test/"
    echo "Directory contents:"
    ls -la test/ || echo "test/ directory not found"
    touch output.log
    exit 1
fi

# Debug: mostra i file trovati
echo "📂 File sorgente trovati:"
ls -la src/*.cpp src/*.c 2>/dev/null || echo "Nessun file .cpp o .c in src/"
echo "📂 File di test trovati:"
ls -la test/*.cpp test/*.c 2>/dev/null || echo "Nessun file .cpp o .c in test/"

# Rileva il framework di test
echo "🔍 Rilevamento framework di test..."
if grep -r "catch.hpp\|catch2.hpp\|catch2/catch.hpp\|catch_amalgamated.hpp" test/ >/dev/null 2>&1; then
    echo "📋 Rilevato Catch2 test framework"
    TEST_FRAMEWORK="catch2"
elif grep -r "boost/test\|BOOST_TEST" test/ >/dev/null 2>&1; then
    echo "🚀 Rilevato Boost.Test framework"
    TEST_FRAMEWORK="boost"
else
    echo "⚠️  Nessun framework rilevato, uso Boost come default"
    TEST_FRAMEWORK="boost"
fi

# Prova a compilare
echo "🔨 Iniziando compilazione..."
if ! make 2>&1 | tee -a output.log; then
    echo "❌ Compilazione fallita"
    # Mostra gli errori di compilazione nel log
    echo "=== ERRORI DI COMPILAZIONE ===" > output.log
    make 2>&1 | tee -a output.log || true
    exit 1
fi

# Verifica che l'eseguibile sia stato creato
if [ ! -f ./test_exec ]; then
    echo "❌ Compilazione fallita: ./test_exec non trovato"
    echo "Files in current directory:"
    ls -la
    touch output.log
    exit 1
fi

echo "✅ Compilazione riuscita"

# Rendi l'eseguibile eseguibile (per sicurezza)
chmod +x ./test_exec

echo "🧪 Esecuzione test con misurazione risorse..."

# Usa file temporanei per separare output test e metriche time
TEST_OUTPUT=$(mktemp)
TIME_METRICS=$(mktemp)

# Usa Python wrapper per timing preciso al nanosecondo
if timeout 300 python3 /usr/local/bin/time_wrapper.py ./test_exec > output.log 2>&1; then
    echo "✅ Test eseguiti con successo"
    
    # Mostra estratto dell'output per debug
    echo "📄 Metriche raccolte:"
    grep -E "User time|System time|Maximum resident|Percent of CPU|Elapsed" output.log || true
else
    EXIT_CODE=$?
    echo "❌ Test falliti (exit code: $EXIT_CODE)" | tee -a output.log
    
    # Se timeout
    if [ $EXIT_CODE -eq 124 ]; then
        echo "⏰ Test terminati per timeout (300 secondi)" | tee -a output.log
    fi
    
    exit $EXIT_CODE
fi

echo "🎉 Tutti i controlli completati"