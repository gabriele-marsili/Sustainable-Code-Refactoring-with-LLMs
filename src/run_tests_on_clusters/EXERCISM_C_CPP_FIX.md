# Fix per Esecuzione Test Exercism C/C++

## Problema

I nuovi entry C/C++ provenienti da Exercism presentavano diversi problemi:

1. **Struttura Directory**: Le entry usano CMake invece di Makefile
2. **Naming**: I file sono organizzati in `src/` e `test/` ma il CMakeLists.txt si aspetta file nella root
3. **Exercise Name**: Il nome dell'esercizio deve corrispondere al nome della directory per CMakeLists.txt
4. **Catch2**: Le entry usano Catch2 che richiede headers e configurazione specifica
5. **Memoria**: La compilazione di Catch2 single-header richiede molta memoria RAM

## Soluzioni Implementate

### 1. Passaggio Nome Esercizio via Environment Variable

**File modificato**: `run_tests_on_cluster.py`

```python
# Extract exercise name from entry ID and pass to Docker
if language.lower() in ["c", "cpp"]:
    parts = entry_id.split("_")
    if len(parts) >= 3:
        exercise_name = parts[1]
        # Remove number prefix (e.g., "01-hello-world" -> "hello-world")
        import re
        exercise_name = re.sub(r'^\d+-', '', exercise_name)
        docker_cmd.extend(["-e", f"EXERCISM_EXERCISE_NAME={exercise_name}"])
```

### 2. Creazione Directory con Nome Corretto

**File modificati**: `src/docker/cpp/run.sh`, `src/docker/c/run.sh`

Lo script:
- Legge `EXERCISM_EXERCISE_NAME` dall'environment
- Crea una subdirectory con il nome corretto dell'esercizio
- Copia tutti i file nella nuova directory
- Esegue il build da lì

### 3. Aggiustamento Percorsi CMakeLists.txt

Lo script modifica automaticamente il CMakeLists.txt per:
- Aggiungere prefissi `src/` e `test/` ai percorsi dei file
- Aggiungere directory di include per trovare gli header
- Creare file wrapper per Catch2

### 4. Installazione Catch2 v2

**File modificato**: `src/docker/cpp/Dockerfile`

Installato Catch2 v2.13.10 invece di v3, per compatibilità con i test Exercism esistenti.

### 5. Creazione File Main e Wrapper

Lo script crea automaticamente:
- `test/tests-main.cpp`: File main per Catch2
- `test/catch.hpp`: Wrapper che include `<catch2/catch.hpp>`

### 6. Ottimizzazioni Compilazione

- Flag `-O0 -g0`: Nessuna ottimizzazione, nessun simbolo debug per ridurre uso memoria
- Build singolo job (`-j1`): Compila un file alla volta
- Aumento memoria Docker: Da 4GB a 8GB
- **IMPORTANTE**: Aumento memoria Colima: Da 2GB a 10GB

### 7. Rilevamento Eseguibile

Modificato il rilevamento per trovare eseguibili con qualsiasi nome:
```bash
# Try *test* first, then any executable
TEST_EXEC=$(find . -maxdepth 2 -type f -executable -name "*test*" | head -1)
if [ -z "$TEST_EXEC" ]; then
    TEST_EXEC=$(find . -maxdepth 2 -type f -executable ! -name "*.so" ! -name "*.dylib" | head -1)
fi
```

## Configurazione Richiesta

### Memoria Colima

**CRITICO**: Colima deve avere almeno 10GB di RAM per compilare Catch2:

```bash
colima stop
colima start --memory 10 --cpu 4
```

Verifica con:
```bash
colima list
# Output atteso:
# PROFILE    STATUS     ARCH       CPUS    MEMORY    DISK      RUNTIME    ADDRESS
# default    Running    aarch64    4       10GiB     100GiB    docker
```

### Memoria Docker Container

Il codice Python richiede 8GB per container:
```python
docker_cmd = [
    "docker",
    "run",
    "--rm",
    "--memory=8g",  # 8GB per C/C++ con Catch2
    "--cpus=2.0",
    ...
]
```

## Test

Dopo le modifiche, testare con:

```bash
cd src/run_tests_on_clusters
python run_tests_on_cluster.py --cluster-name 01_hello_world --languages cpp --run-quantity 1 --base-only
```

Output atteso:
```
✅ Compilazione riuscita
✅ Test eseguiti con successo
Metrics are valid: True, Time: X.XXms, CPU: XX%, RAM: XXXXKB
Successful tests: 1 (100.0%)
```

## File Modificati

1. `src/run_tests_on_cluster.py`:
   - Aggiunto passaggio exercise name via env var (linee ~1694-1705)
   - Aumentato memoria Docker a 8GB (linea ~1684)

2. `src/docker/cpp/run.sh`:
   - Aggiunto supporto CMake detection (linee ~62-126)
   - Aggiunto creazione directory con nome corretto
   - Aggiunto fix percorsi CMakeLists.txt
   - Aggiunto creazione file Catch2
   - Aggiunto flag ottimizzazione memoria
   - Aggiunto rilevamento eseguibile migliorato

3. `src/docker/c/run.sh`:
   - Stesse modifiche di cpp/run.sh

4. `src/docker/cpp/Dockerfile`:
   - Cambiato Catch2 da v3.4.0 a v2.13.10

5. `src/docker/c/Dockerfile`:
   - Aggiunto CMake alle dipendenze

## Statistiche

- **53 clusters** con nuove entry C/C++ da Exercism
- **~1,020 varianti LLM** generate (53 × 3 modelli × 4 prompt × 2 linguaggi)
- **Tempo compilazione**: ~3-5 secondi per entry
- **Memoria peak**: ~2-4GB durante compilazione Catch2

## Note

- Le entry Exercism hanno convenzione di naming: `{numero}-{exercise-name}_exercism-{username}`
- Il numero viene rimosso per ottenere il nome corretto dell'esercizio
- Il CMakeLists.txt deriva automaticamente i nomi dei file dal nome della directory
- Catch2 v2 single-header è molto grande (~600KB) e richiede molta memoria per compilare
