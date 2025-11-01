#!/bin/bash
set -e

# Usa un percorso assoluto per il file di log
LOG_FILE="/app/output.log"
# Pulisci il log all'inizio
> "$LOG_FILE"

echo "🧹 Pulizia file precedenti..." | tee -a "$LOG_FILE"

# Detect build system
if [ -f "CMakeLists.txt" ]; then
    echo "📦 Detected CMake build system" | tee -a "$LOG_FILE"
    BUILD_SYSTEM="cmake"
    rm -rf build || true
elif [ -f "Makefile" ] || [ -f "makefile" ]; then
    echo "🔧 Detected Make build system" | tee -a "$LOG_FILE"
    BUILD_SYSTEM="make"
    make clean >> "$LOG_FILE" 2>&1 || true
else
    echo "⚠️  No build system detected, will try CMake as default" | tee -a "$LOG_FILE"
    BUILD_SYSTEM="cmake"
fi

# Controlla se ci sono file sorgente
if ! ls src/*.cpp >/dev/null 2>&1 && ! ls src/*.c >/dev/null 2>&1; then
    echo "❌ Nessun file sorgente trovato in src/" | tee -a "$LOG_FILE"
    ls -la src/ >> "$LOG_FILE" 2>&1 || echo "src/ directory not found" >> "$LOG_FILE"
    exit 1
fi

# Controlla se ci sono file di test
if ! ls test/*.cpp >/dev/null 2>&1 && ! ls test/*.c >/dev/null 2>&1; then
    echo "❌ Nessun file di test trovato in test/" | tee -a "$LOG_FILE"
    ls -la test/ >> "$LOG_FILE" 2>&1 || echo "test/ directory not found" >> "$LOG_FILE"
    exit 1
fi

# Debug: mostra i file trovati
echo "📂 File sorgente trovati:" | tee -a "$LOG_FILE"
ls -la src/*.cpp src/*.c >> "$LOG_FILE" 2>&1 || true
echo "📂 File di test trovati:" | tee -a "$LOG_FILE"
ls -la test/*.cpp test/*.c >> "$LOG_FILE" 2>&1 || true

# Rileva il framework di test
echo "🔍 Rilevamento framework di test..." | tee -a "$LOG_FILE"
if grep -r "catch.hpp\|catch2.hpp\|catch2/catch.hpp\|catch_amalgamated.hpp" test/ >/dev/null 2>&1; then
    echo "📋 Rilevato Catch2 test framework" | tee -a "$LOG_FILE"
    TEST_FRAMEWORK="catch2"
elif grep -r "boost/test\|BOOST_TEST" test/ >/dev/null 2>&1; then
    echo "🚀 Rilevato Boost.Test framework" | tee -a "$LOG_FILE"
    TEST_FRAMEWORK="boost"
else
    echo "⚠️  Nessun framework rilevato, uso Boost come default" | tee -a "$LOG_FILE"
    TEST_FRAMEWORK="boost"
fi

# Prova a compilare
echo "🔨 Iniziando compilazione..." | tee -a "$LOG_FILE"

if [ "$BUILD_SYSTEM" = "cmake" ]; then
    # CMake build
    CMAKE_SUCCESS=0
    CMAKE_FLAGS=""
    if grep -q "EXERCISM_TEST_SUITE" CMakeLists.txt 2>/dev/null; then
        CMAKE_FLAGS="-DEXERCISM_RUN_ALL_TESTS=1"
        echo "🎯 Detected Exercism CMakeLists, using flags: $CMAKE_FLAGS" | tee -a "$LOG_FILE"

        if [ -n "$EXERCISM_EXERCISE_NAME" ]; then
            echo "📝 Using exercise name from environment: $EXERCISM_EXERCISE_NAME" | tee -a "$LOG_FILE"

            # --- CORREZIONE CHIAVE ---
            # Crea la directory di lavoro DENTRO /app e usa il nome dell'esercizio
            WORK_DIR="/app/$EXERCISM_EXERCISE_NAME"
            mkdir -p "$WORK_DIR"
            echo "🔧 Creating directory: $WORK_DIR" | tee -a "$LOG_FILE"

            echo "📦 Copying files..." | tee -a "$LOG_FILE"
            # Copia tutto da /app (la root del mount) a /app/NOME_ESERCIZIO
            for item in *; do
                # Evita di copiare la directory di build o se stessa
                if [ "$item" != "build" ] && [ "$item" != "$EXERCISM_EXERCISE_NAME" ]; then
                    cp -r "$item" "$WORK_DIR/"
                fi
            done

            echo "📁 Switching to directory: $WORK_DIR" | tee -a "$LOG_FILE"
            cd "$WORK_DIR" # Ora siamo in /app/hello-world (o simile)
            echo "✓ Now in directory: $(pwd)" | tee -a "$LOG_FILE"

            # Fix CMakeLists.txt paths
            if [ -f "CMakeLists.txt" ] && [ -d "src" ] && [ -d "test" ]; then
                echo "🔧 Fixing CMakeLists.txt paths for src/ and test/ subdirectories..." | tee -a "$LOG_FILE"
                sed -i 's|\${file}\.cpp|src/\${file}.cpp|g; s|\${file}\.h|src/\${file}.h|g; s|\${file}_test\.cpp|test/\${file}_test.cpp|g' CMakeLists.txt
                sed -i '/^project(/a include_directories(src)' CMakeLists.txt

                if [ ! -f "test/tests-main.cpp" ]; then
                    cat > test/tests-main.cpp << 'EOF'
#define CATCH_CONFIG_MAIN
#include "catch.hpp"
EOF
                fi
                cat > test/catch.hpp << 'EOF'
#include <catch2/catch.hpp>
EOF
                sed -i '/^include_directories(src)/a include_directories(.)' CMakeLists.txt
            fi
        else
            echo "⚠️  EXERCISM_EXERCISE_NAME not set, using current directory" | tee -a "$LOG_FILE"
        fi
    fi

    mkdir -p build
    cd build

    export CXXFLAGS="-O0 -g0"

    # Scrivi l'output di cmake nel log assoluto
    if ! cmake $CMAKE_FLAGS .. >> "$LOG_FILE" 2>&1; then
        echo "❌ CMake configuration failed" | tee -a "$LOG_FILE"
        # Esegui di nuovo per stampare l'errore anche su stdout (visibile nel log di docker)
        cmake $CMAKE_FLAGS ..
        cd ..
        CMAKE_SUCCESS=1
    fi

    # Scrivi l'output di build nel log assoluto (solo se la configurazione è riuscita)
    if [ $CMAKE_SUCCESS -eq 0 ] && ! cmake --build . -j1 >> "$LOG_FILE" 2>&1; then
        echo "❌ CMake build failed" | tee -a "$LOG_FILE"
        # Esegui di nuovo per stampare l'errore anche su stdout
        cmake --build . -j1
        cd ..
        CMAKE_SUCCESS=1
    fi

    # Se CMake è fallito, prova il fallback
    if [ $CMAKE_SUCCESS -eq 1 ]; then
        echo "⚠️  CMake failed, attempting fallback to universal Makefile..." | tee -a "$LOG_FILE"

        # Torna alla working directory corretta
        if [ -n "$EXERCISM_EXERCISE_NAME" ] && [ -d "/app/$EXERCISM_EXERCISE_NAME" ]; then
            cd "/app/$EXERCISM_EXERCISE_NAME"
        else
            cd /app
        fi

        if [ -f "Makefile.fallback" ]; then
            cp Makefile.fallback Makefile
            if make >> "$LOG_FILE" 2>&1; then
                echo "✅ Fallback to universal Makefile succeeded" | tee -a "$LOG_FILE"
                CMAKE_SUCCESS=0
            else
                echo "❌ Universal Makefile fallback also failed" | tee -a "$LOG_FILE"
                exit 1
            fi
        else
            echo "❌ No fallback Makefile available after CMake failure" | tee -a "$LOG_FILE"
            exit 1
        fi
    else
        # CMake succeeded - find executable in build directory
        # Trova l'eseguibile
        TEST_EXEC=$(find . -maxdepth 2 -type f -executable -name "*test*" | head -1)
        if [ -z "$TEST_EXEC" ]; then
            TEST_EXEC=$(find . -maxdepth 2 -type f -executable ! -name "*.so" ! -name "*.dylib" | head -1)
        fi

        if [ -z "$TEST_EXEC" ]; then
            echo "❌ No test executable found after CMake build" | tee -a "$LOG_FILE"
            ls -la >> "$LOG_FILE" 2>&1
            cd ..
            exit 1
        fi

        echo "✅ Found test executable: $TEST_EXEC" | tee -a "$LOG_FILE"
        cp "$TEST_EXEC" ../test_exec
        cd .. # Torna a WORK_DIR
    fi

    # --- CORREZIONE CHIAVE ---
    # Copia l'eseguibile finale e il log in /app (se necessario)
    if [ -n "$EXERCISM_EXERCISE_NAME" ]; then
        echo "📦 Copying executable back to /app" | tee -a "$LOG_FILE"
        cp test_exec /app/test_exec
        cd /app # Torna alla root /app
    fi

elif [ "$BUILD_SYSTEM" = "make" ]; then
    # Make build with fallback to universal Makefile
    if [ -f "Makefile" ]; then
        echo "🔨 Attempting build with existing Makefile..." | tee -a "$LOG_FILE"
        if ! make >> "$LOG_FILE" 2>&1; then
            echo "⚠️  Original Makefile failed, trying universal Makefile..." | tee -a "$LOG_FILE"

            # Backup original Makefile
            mv Makefile Makefile.original

            # Use universal Makefile as fallback
            if [ -f "Makefile.fallback" ]; then
                cp Makefile.fallback Makefile
                if ! make >> "$LOG_FILE" 2>&1; then
                    echo "❌ Universal Makefile also failed" | tee -a "$LOG_FILE"
                    exit 1
                fi
                echo "✅ Universal Makefile succeeded" | tee -a "$LOG_FILE"
            else
                echo "❌ No fallback Makefile available" | tee -a "$LOG_FILE"
                exit 1
            fi
        fi
    else
        echo "📝 No Makefile found, using universal Makefile..." | tee -a "$LOG_FILE"
        if [ -f "Makefile.fallback" ]; then
            cp Makefile.fallback Makefile
            if ! make >> "$LOG_FILE" 2>&1; then
                echo "❌ Universal Makefile failed" | tee -a "$LOG_FILE"
                exit 1
            fi
        else
            echo "❌ No Makefile.fallback available" | tee -a "$LOG_FILE"
            exit 1
        fi
    fi
fi

# Verifica che l'eseguibile sia stato creato in /app
if [ ! -f ./test_exec ]; then
    echo "❌ Compilazione fallita: ./test_exec non trovato in /app" | tee -a "$LOG_FILE"
    ls -la >> "$LOG_FILE" 2>&1
    exit 1
fi

echo "✅ Compilazione riuscita" | tee -a "$LOG_FILE"
chmod +x ./test_exec

echo "🧪 Esecuzione test con misurazione risorse..." | tee -a "$LOG_FILE"

# Esegui i test e ACCUMULA l'output (compreso time_wrapper) al file di log
if timeout 300 python3 /usr/local/bin/time_wrapper.py ./test_exec >> "$LOG_FILE" 2>&1; then
    echo "✅ Test eseguiti con successo" | tee -a "$LOG_FILE"
else
    EXIT_CODE=$?
    echo "❌ Test falliti (exit code: $EXIT_CODE)" | tee -a "$LOG_FILE"
    if [ $EXIT_CODE -eq 124 ]; then
        echo "⏰ Test terminati per timeout (300 secondi)" | tee -a "$LOG_FILE"
    fi
    exit $EXIT_CODE
fi

echo "🎉 Tutti i controlli completati" | tee -a "$LOG_FILE"