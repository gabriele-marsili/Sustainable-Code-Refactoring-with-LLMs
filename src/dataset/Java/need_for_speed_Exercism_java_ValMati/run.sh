#!/bin/bash
set -e

echo "⬇️ Scarico librerie JUnit 5, Hamcrest, AssertJ..."

# JUnit 5 (Jupiter) - versioni aggiornate
wget -q -O junit-platform-console-standalone-1.10.0.jar https://repo1.maven.org/maven2/org/junit/platform/junit-platform-console-standalone/1.10.0/junit-platform-console-standalone-1.10.0.jar
wget -q -O junit-jupiter-api-5.10.0.jar https://repo1.maven.org/maven2/org/junit/jupiter/junit-jupiter-api/5.10.0/junit-jupiter-api-5.10.0.jar
wget -q -O junit-jupiter-engine-5.10.0.jar https://repo1.maven.org/maven2/org/junit/jupiter/junit-jupiter-engine/5.10.0/junit-jupiter-engine-5.10.0.jar
wget -q -O junit-jupiter-params-5.10.0.jar https://repo1.maven.org/maven2/org/junit/jupiter/junit-jupiter-params/5.10.0/junit-jupiter-params-5.10.0.jar

# AssertJ e Hamcrest per compatibilità
wget -q -O assertj-core-3.24.2.jar https://repo1.maven.org/maven2/org/assertj/assertj-core/3.24.2/assertj-core-3.24.2.jar
wget -q -O hamcrest-core-1.3.jar https://repo1.maven.org/maven2/org/hamcrest/hamcrest-core/1.3/hamcrest-core-1.3.jar

# Fallback: mantieni anche JUnit 4 per retrocompatibilità
wget -q -O junit-4.13.2.jar https://repo1.maven.org/maven2/junit/junit/4.13.2/junit-4.13.2.jar

echo "🔍 Compilazione..."

# Classpath completo con tutte le librerie
CLASSPATH=".:junit-platform-console-standalone-1.10.0.jar:junit-jupiter-api-5.10.0.jar:junit-jupiter-engine-5.10.0.jar:junit-jupiter-params-5.10.0.jar:junit-4.13.2.jar:hamcrest-core-1.3.jar:assertj-core-3.24.2.jar"

# Compilazione con classpath esteso
javac -cp "$CLASSPATH" *.java

echo "🧪 Esecuzione test..."

# Trova la classe di test
TEST_CLASS=""

# Prima prova a trovare JUnit 5
if grep -l "org.junit.jupiter.api" *.java > /dev/null 2>&1; then
    TEST_CLASS=$(grep -l "org.junit.jupiter.api" *.java | sed 's/\.java//' | head -n 1)
    echo "🔍 Trovata classe JUnit 5: $TEST_CLASS"
    
    # Esegui con JUnit Platform Console Launcher
    /usr/bin/time -v java -cp "$CLASSPATH" org.junit.platform.console.ConsoleLauncher --class-path . --select-class "$TEST_CLASS" > output.log 2>&1 || true
elif grep -l "@Test" *.java > /dev/null 2>&1; then
    # Fallback a JUnit 4
    TEST_CLASS=$(grep -l "@Test" *.java | sed 's/\.java//' | head -n 1)
    echo "🔍 Trovata classe JUnit 4: $TEST_CLASS"
    
    # Esegui con JUnit 4
    /usr/bin/time -v java -cp "$CLASSPATH" org.junit.runner.JUnitCore "$TEST_CLASS" > output.log 2>&1 || true
else
    echo "❌ Nessuna classe di test trovata con @Test annotation" > output.log
fi

# Assicurati che output.log esista sempre
if [ ! -f output.log ]; then
    echo "❌ Errore: output.log non generato" > output.log
    echo "TEST_CLASS era: $TEST_CLASS" >> output.log
    echo "File presenti:" >> output.log
    ls -la *.java >> output.log 2>&1 || true
fi

echo "▶️ Contenuto di output.log:"
cat output.log || echo "⚠️ Impossibile leggere output.log"

echo "⛔ Script completato"