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

echo "🔧 Compilazione..." | tee -a "$LOG_FILE"

if [ "$BUILD_SYSTEM" = "cmake" ]; then
    # CMake build
    CMAKE_SUCCESS=0
    CMAKE_FLAGS=""
    if grep -q "EXERCISM_TEST_SUITE" CMakeLists.txt 2>/dev/null; then
        CMAKE_FLAGS="-DEXERCISM_TEST_SUITE=1 -DEXERCISM_RUN_ALL_TESTS=1"
        echo "🎯 Detected Exercism CMakeLists, using flags: $CMAKE_FLAGS" | tee -a "$LOG_FILE"

        if [ -n "$EXERCISM_EXERCISE_NAME" ]; then
            echo "📝 Using exercise name from environment: $EXERCISM_EXERCISE_NAME" | tee -a "$LOG_FILE"

            # --- CORREZIONE CHIAVE ---
            WORK_DIR="/app/$EXERCISM_EXERCISE_NAME"
            mkdir -p "$WORK_DIR"
            echo "🔧 Creating directory: $WORK_DIR" | tee -a "$LOG_FILE"

            echo "📦 Copying files..." | tee -a "$LOG_FILE"
            for item in *; do
                if [ "$item" != "build" ] && [ "$item" != "$EXERCISM_EXERCISE_NAME" ]; then
                    cp -r "$item" "$WORK_DIR/"
                fi
            done

            echo "📁 Switching to directory: $WORK_DIR" | tee -a "$LOG_FILE"
            cd "$WORK_DIR"
            echo "✓ Now in directory: $(pwd)" | tee -a "$LOG_FILE"

            # Fix CMakeLists.txt paths
            if [ -f "CMakeLists.txt" ] && [ -d "src" ] && [ -d "test" ]; then
                echo "🔧 Fixing CMakeLists.txt paths for src/ and test/ subdirectories..." | tee -a "$LOG_FILE"
                sed -i 's|\${file}\.c|src/\${file}.c|g; s|\${file}\.h|src/\${file}.h|g; s|\${file}_test\.c|test/\${file}_test.c|g' CMakeLists.txt
                sed -i '/^project(/a include_directories(src)' CMakeLists.txt
            fi
        else
            echo "⚠️  EXERCISM_EXERCISE_NAME not set, using current directory" | tee -a "$LOG_FILE"
        fi
    fi

    mkdir -p build
    cd build

    export CFLAGS="-O0 -g0"

    # Scrivi l'output di cmake nel log assoluto
    if ! cmake $CMAKE_FLAGS .. >> "$LOG_FILE" 2>&1; then
        echo "❌ CMake configuration failed" | tee -a "$LOG_FILE"
        cmake $CMAKE_FLAGS ..
        cd ..
        CMAKE_SUCCESS=1
    fi

    # Scrivi l'output di build nel log assoluto (solo se la configurazione è riuscita)
    if [ $CMAKE_SUCCESS -eq 0 ] && ! cmake --build . -j1 >> "$LOG_FILE" 2>&1; then
        echo "❌ CMake build failed" | tee -a "$LOG_FILE"
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
        cp "$TEST_EXEC" ../tests.out
        cd .. # Torna a WORK_DIR
    fi

    # --- CORREZIONE CHIAVE ---
    # Copia l'eseguibile finale in /app (se necessario)
    if [ -n "$EXERCISM_EXERCISE_NAME" ]; then
        echo "📦 Copying executable back to /app" | tee -a "$LOG_FILE"
        cp tests.out /app/tests.out
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

if [ ! -f ./tests.out ]; then
    echo "❌ Compilazione fallita: ./tests.out non trovato in /app" | tee -a "$LOG_FILE"
    ls -la >> "$LOG_FILE" 2>&1
    exit 1
fi

chmod +x ./tests.out

echo "🧪 Esecuzione test con misurazione risorse..." | tee -a "$LOG_FILE"

# Esegui i test e ACCUMULA l'output (compreso time_wrapper) al file di log
if python3 /usr/local/bin/time_wrapper.py ./tests.out >> "$LOG_FILE" 2>&1; then
    echo "✅ Test eseguiti con successo" | tee -a "$LOG_FILE"
else
    EXIT_CODE=$?
    echo "❌ Test falliti (exit code: $EXIT_CODE)" | tee -