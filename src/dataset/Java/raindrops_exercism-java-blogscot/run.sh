#!/bin/bash
set -e

echo "⬇️ Scarico librerie JUnit..."

wget -q -O junit-4.13.2.jar https://repo1.maven.org/maven2/junit/junit/4.13.2/junit-4.13.2.jar
wget -q -O hamcrest-core-1.3.jar https://repo1.maven.org/maven2/org/hamcrest/hamcrest-core/1.3/hamcrest-core-1.3.jar

echo "🔍 Compilazione..."

# Trova tutti i file .java e salva i percorsi
find . -name "*.java" > sources.txt

# Compila includendo i JAR nel classpath
javac -cp .:junit-4.13.2.jar:hamcrest-core-1.3.jar @sources.txt

echo "🧪 Esecuzione test..."

# Trova la classe del test
TEST_CLASS=$(grep -l "@Test" *.java | sed 's/\.java//' | head -n 1)

# Esegui i test con junit.textui (JUnit 4)
# Salva stdout e stderr in output.log
/usr/bin/time -v java -cp .:junit-4.13.2.jar:hamcrest-core-1.3.jar org.junit.runner.JUnitCore "$TEST_CLASS" > output.log 2>&1
