# Sistema di Build Universale per C/C++

## Panoramica

Sistema di build robusto e universale per la compilazione ed esecuzione di test C/C++ con supporto per:
- Auto-rilevamento build system (CMake, Make)
- Fallback automatico in caso di fallimento
- Supporto multi-framework (Catch2, Boost.Test, Unity, GoogleTest, ecc.)
- Gestione intelligente di strutture di progetto diverse

## Architettura

### Livelli del Sistema

```
┌─────────────────────────────────────────────────────────┐
│  run_tests_on_cluster.py (Orchestrator Python)         │
│  - Gestione container Docker                            │
│  - Copia file e setup ambiente                          │
│  - Parsing metriche e categorizzazione errori           │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│  Docker Container (C/C++)                                │
│  - Immagine con build tools installati                  │
│  - Catch2 v2.13.10, Boost.Test, CMake, Make             │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│  run.sh (Build Script)                                   │
│  - Rilevamento build system                             │
│  - Esecuzione CMake/Make con fallback                   │
│  - Gestione esercizi Exercism                           │
└────────────────┬────────────────────────────────────────┘
                 │
         ┌───────┴───────┐
         ▼               ▼
  ┌───────────┐   ┌──────────────┐
  │  CMake    │   │  Makefile    │
  │  (primario)   │  (fallback)  │
  └───────────┘   └──────────────┘
         │               │
         └───────┬───────┘
                 ▼
       ┌──────────────────┐
       │ Makefile.universal│
       │  (fallback finale)│
       └──────────────────┘
```

### Flusso di Compilazione

```
1. Rileva build system:
   - Se esiste CMakeLists.txt → CMAKE
   - Se esiste Makefile → MAKE
   - Altrimenti → CMAKE (default)

2. Tentativo build primario:

   CMAKE:
   ├─ CMake configuration
   │  ├─ Success → CMake build
   │  └─ Failure → Fallback Makefile.universal
   └─ CMake build
      ├─ Success → Executable trovato
      └─ Failure → Fallback Makefile.universal

   MAKE:
   ├─ Make con Makefile esistente
   │  ├─ Success → Executable trovato
   │  └─ Failure → Fallback Makefile.universal
   └─ Se no Makefile → Usa Makefile.universal

3. Esecuzione test:
   - time_wrapper.py misura metriche (CPU, RAM, tempo)
   - Output parsing per risultati test
   - Categorizzazione errori (type_mismatch, compilation, ecc.)
```

## Componenti

### 1. Makefile.universal

**Path**: `src/docker/{c|cpp}/Makefile.universal`

#### Features

- **Auto-detection file sorgente**: Trova tutti i `.c/.cpp` in qualsiasi directory
- **Auto-detection test framework**: Rileva Catch2, Boost, GoogleTest, Unity, etc.
- **Include paths dinamici**: Scansiona e aggiunge automaticamente directory con header
- **Compilazione universale**: Funziona con qualsiasi struttura di progetto

#### Esempio Auto-Detection

```makefile
# Trova tutti i file C++ escludendo build directories
ALL_CPP_FILES = $(shell find . -type f -name "*.cpp" 2>/dev/null | \
                grep -v "/build/" | grep -v "/obj/")

# Separa source da test
TEST_FILES = $(filter %test.cpp %_test.cpp, $(ALL_CPP_FILES))
SRC_FILES = $(filter-out $(TEST_FILES), $(ALL_CPP_FILES))

# Trova tutte le directory con header
HEADER_DIRS = $(shell find . -type f -name "*.h" -o -name "*.hpp" | \
              xargs -r dirname | sort -u)

# Rileva framework
HAS_CATCH2 = $(shell grep -l "catch2/catch.hpp" $(TEST_FILES))
HAS_BOOST = $(shell grep -l "boost/test" $(TEST_FILES))
```

#### Utilizzo

```bash
# Info su progetto rilevato
make info

# Debug detection
make debug

# Build
make

# Clean
make clean
```

### 2. run.sh (Build Scripts)

**Path**: `src/docker/{c|cpp}/run.sh`

#### Logica Fallback CMake

```bash
CMAKE_SUCCESS=0

# Tenta CMake configuration
if ! cmake $CMAKE_FLAGS .. >> "$LOG_FILE" 2>&1; then
    CMAKE_SUCCESS=1
fi

# Tenta CMake build (se config ok)
if [ $CMAKE_SUCCESS -eq 0 ] && ! cmake --build . -j1 >> "$LOG_FILE" 2>&1; then
    CMAKE_SUCCESS=1
fi

# Se CMake fallito → fallback
if [ $CMAKE_SUCCESS -eq 1 ]; then
    echo "⚠️  CMake failed, attempting fallback to universal Makefile..."
    cd "$WORK_DIR"
    if [ -f "Makefile.fallback" ]; then
        cp Makefile.fallback Makefile
        make >> "$LOG_FILE" 2>&1
    fi
fi
```

#### Logica Fallback Make

```bash
if [ -f "Makefile" ]; then
    # Tenta Makefile originale
    if ! make >> "$LOG_FILE" 2>&1; then
        echo "⚠️  Original Makefile failed, trying universal Makefile..."
        mv Makefile Makefile.original
        cp Makefile.fallback Makefile
        make >> "$LOG_FILE" 2>&1
    fi
else
    # No Makefile → usa universal direttamente
    cp Makefile.fallback Makefile
    make >> "$LOG_FILE" 2>&1
fi
```

#### Gestione Exercism

Per entry Exercism con CMake:

```bash
# Estrae nome esercizio da environment variable
EXERCISM_EXERCISE_NAME="hello-world"  # passato da Python

# Crea directory con nome corretto
WORK_DIR="/app/$EXERCISM_EXERCISE_NAME"
mkdir -p "$WORK_DIR"

# Copia file e switch directory
cp -r * "$WORK_DIR/"
cd "$WORK_DIR"

# Fix percorsi CMakeLists.txt per src/ e test/
sed -i 's|\${file}\.cpp|src/\${file}.cpp|g' CMakeLists.txt
sed -i '/^project(/a include_directories(src)' CMakeLists.txt

# Crea file wrapper Catch2
cat > test/tests-main.cpp << 'EOF'
#define CATCH_CONFIG_MAIN
#include "catch.hpp"
EOF
```

### 3. run_tests_on_cluster.py

**Path**: `src/run_tests_on_clusters/run_tests_on_cluster.py`

#### Setup Ambiente C/C++

```python
def _setup_cpp_or_c(self, dockerfile_path: Path, mount_path: Path):
    # Copia universal Makefile come fallback (sempre)
    universal_makefile = dockerfile_path / "Makefile.universal"
    if universal_makefile.exists():
        fallback_dest = mount_path / "Makefile.fallback"
        shutil.copy2(universal_makefile, fallback_dest)

    # Copia Makefile specifico SOLO se non esiste
    makefile_dest = mount_path / "Makefile"
    if not makefile_dest.exists():
        for makefile_name in ["Makefile.catch", "Makefile.boost", "Makefile"]:
            makefile_src = dockerfile_path / makefile_name
            if makefile_src.exists():
                shutil.copy2(makefile_src, makefile_dest)
                break
```

#### Passaggio Exercise Name

```python
# Estrae nome esercizio da entry ID
if language.lower() in ["c", "cpp"]:
    parts = entry_id.split("_")
    if len(parts) >= 3:
        exercise_name = parts[1]  # "01-hello-world"
        exercise_name = re.sub(r'^\d+-', '', exercise_name)  # "hello-world"
        docker_cmd.extend(["-e", f"EXERCISM_EXERCISE_NAME={exercise_name}"])
```

### 4. Dockerfiles

**Path**: `src/docker/{c|cpp}/Dockerfile`

#### C++ Dockerfile

```dockerfile
FROM gcc:latest

# Installa dipendenze
RUN apt-get update && apt-get install -y \
    make g++ cmake \
    libboost-test-dev \
    python3 git

# Installa Catch2 v2.13.10
RUN cd /tmp && \
    git clone https://github.com/catchorg/Catch2.git && \
    cd Catch2 && \
    git checkout v2.13.10 && \
    cmake -B build -S . && \
    cmake --build build/ --target install

# Copia Makefile universale
COPY Makefile.universal /usr/local/share/Makefile.universal
COPY time_wrapper.py /usr/local/bin/time_wrapper.py
```

#### C Dockerfile

```dockerfile
FROM ubuntu:22.04

# Installa dipendenze
RUN apt-get update && apt-get install -y \
    gcc make cmake python3

# Copia Makefile universale
COPY Makefile.universal /usr/local/share/Makefile.universal
COPY time_wrapper.py /usr/local/bin/time_wrapper.py
```

## Categorizzazione Errori

Il sistema categorizza automaticamente gli errori di compilazione:

### Type Mismatch

Pattern rilevati:
- `ambiguating new declaration`
- `conflicting types for`
- `incompatible types`
- `no viable conversion`

**Significato**: L'LLM ha cambiato una function signature (es. `std::string` → `const char*`)

**Comportamento atteso**: Compilazione fallisce, `regressionTestPassed: false`

### Compilation Error

Pattern rilevati:
- `error:` generico
- `undefined reference`
- `No such file or directory`

**Significato**: Errore di compilazione generico

### Metrics Parse Failure

**Significato**: Test eseguito ma metriche non parsabili (dovrebbe essere raro con nuovo sistema)

## Test e Validazione

### Test Base Code

```bash
cd src/run_tests_on_clusters
python3 run_tests_on_cluster.py \
    --cluster-name 01_hello_world \
    --languages cpp \
    --run-quantity 1 \
    --base-only \
    --no-cache
```

**Output atteso**:
```
✅ Successful tests: 1 (100.0%)
Metrics: Time: ~1-2ms, CPU: 60-90%, RAM: ~10MB
```

### Test LLM Code

```bash
python3 run_tests_on_cluster.py \
    --cluster-name 01_hello_world \
    --languages cpp \
    --run-quantity 1 \
    --llm-only
```

**Output atteso**:
```
Successful tests: ~33-66% (alcuni LLM cambiano signatures)
Failed tests: Categorizzati come "type_mismatch"
```

### Test Completo (Tutti i 53 Clusters)

```bash
./run_new_c_cpp_entries.sh
```

## Troubleshooting

### Container Build Failures

**Problema**: Docker build fallisce

**Soluzioni**:
1. Verifica memoria Colima: `colima list` (dovrebbe mostrare ≥10GB)
2. Aumenta memoria: `colima stop && colima start --memory 10 --cpu 4`
3. Pulisci cache: `docker system prune -a`

### CMake Warnings

**Problema**: `CMake Deprecation Warning at CMakeLists.txt:5`

**Soluzione**: Warning benigno, non influisce su compilazione

### Makefile.fallback Not Found

**Problema**: `❌ No fallback Makefile available`

**Cause possibili**:
1. Dockerfile non aggiornato (manca `COPY Makefile.universal`)
2. Container costruito prima delle modifiche

**Soluzione**:
```bash
# Rimuovi container e rebuild
docker rm -f test_runner_cpp_persistent test_runner_c_persistent
python3 run_tests_on_cluster.py ... --no-cache
```

### Test Framework Non Rilevato

**Problema**: `⚠️  Nessun framework rilevato, uso Boost come default`

**Debug**:
```bash
# Nel container, verifica detection
cd /app/your-project
make -f Makefile.universal debug
```

## Metriche e Performance

### Tempi di Compilazione

- **CMake build**: 3-5 secondi (primo build)
- **Make build**: 2-4 secondi
- **Fallback overhead**: +1-2 secondi

### Uso Memoria

- **Container**: 8GB allocati (necessari per Catch2)
- **Peak compilation**: 2-4GB (Catch2 headers)
- **Runtime test**: 10-20MB

### Success Rate Atteso

- **Base code**: 100% (sempre compila)
- **LLM code**: 60-75% (alcuni cambiano signatures)

## Files Modificati

### Nuovi Files
1. `src/docker/cpp/Makefile.universal`
2. `src/docker/c/Makefile.universal`
3. `src/run_tests_on_clusters/UNIVERSAL_BUILD_SYSTEM.md` (questo file)

### Files Modificati
1. `src/docker/cpp/run.sh` - Aggiunto fallback logic
2. `src/docker/c/run.sh` - Aggiunto fallback logic
3. `src/run_tests_on_clusters/run_tests_on_cluster.py` - Non sovrascrive Makefile
4. `src/docker/cpp/Dockerfile` - Copia Makefile.universal
5. `src/docker/c/Dockerfile` - Copia Makefile.universal

## Changelog

### 2025-10-31 - Initial Implementation

**Aggiunto**:
- Sistema di build universale con auto-detection
- Fallback automatico da CMake a Make
- Makefile.universal per C e C++
- Supporto migliorato per entry Exercism
- Gestione intelligente di Makefile esistenti

**Migliorato**:
- Robustezza compilazione (fallback multi-livello)
- Detection framework di test automatico
- Logging e diagnostica errori
- Gestione directory e percorsi

**Preservato**:
- Categorizzazione errori (type_mismatch funziona perfettamente)
- Comportamento per entry esistenti (backward compatible)
- Sistema di metriche (CPU, RAM, tempo)
- Workflow di test (base + LLM variants)

## Contatti

Per domande o problemi:
- Check logs in `src/logs/*_diagnostic.json`
- Verifica output dettagliato con `make info` nel Makefile.universal
- Consulta EXERCISM_C_CPP_FIX.md per fix precedenti
