#!/bin/bash
set -e

echo "⬇️ Scarico librerie JUnit..."
wget -q -O junit-4.13.2.jar https://repo1.maven.org/maven2/junit/junit/4.13.2/junit-4.13.2.jar
wget -q -O hamcrest-core-1.3.jar https://repo1.maven.org/maven2/org/hamcrest/hamcrest-core/1.3/hamcrest-core-1.3.jar

echo "🔍 Compilazione..."
# Compila tutti i file .java nella directory corrente
javac -cp .:junit-4.13.2.jar:hamcrest-core-1.3.jar *.java

echo "🧪 Esecuzione test..."
# Trova la classe del test in base all'annotazione @Test
TEST_CLASS=$(grep -l "@Test" *.java | sed 's/\.java//' | head -n 1)

if [ -z "$TEST_CLASS" ]; then
    echo "❌ Classe di test non trovata."
    exit 1
fi

# Esegui i test
/usr/bin/time -v java -cp .:junit-4.13.2.jar:hamcrest-core-1.3.jar org.junit.runner.JUnitCore "$TEST_CLASS" > output.log 2>&1