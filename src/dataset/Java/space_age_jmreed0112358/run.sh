#!/bin/bash
set -e

echo "⬇️ Scarico librerie JUnit, Hamcrest, AssertJ..."
wget -q -O junit-4.13.2.jar https://repo1.maven.org/maven2/junit/junit/4.13.2/junit-4.13.2.jar
wget -q -O hamcrest-core-1.3.jar https://repo1.maven.org/maven2/org/hamcrest/hamcrest-core/1.3/hamcrest-core-1.3.jar
wget -q -O assertj-core-3.24.2.jar https://repo1.maven.org/maven2/org/assertj/assertj-core/3.24.2/assertj-core-3.24.2.jar

echo "🔍 Compilazione..."
javac -cp .:junit-4.13.2.jar:hamcrest-core-1.3.jar:assertj-core-3.24.2.jar *.java

echo "🧪 Esecuzione test..."
TEST_CLASS=$(grep -l "@Test" *.java | sed 's/\.java//' | head -n 1)

if [ -z "$TEST_CLASS" ]; then
    echo "❌ Classe di test non trovata."
    exit 1
fi

/usr/bin/time -v java -cp .:junit-4.13.2.jar:hamcrest-core-1.3.jar:assertj-core-3.24.2.jar org.junit.runner.JUnitCore "$TEST_CLASS" > output.log 2>&1
