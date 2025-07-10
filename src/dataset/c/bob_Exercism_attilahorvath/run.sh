#!/bin/bash
set -e

echo "📁 Contenuto corrente:"
ls -la
echo "📁 Contenuto src/:"
ls -la src
echo "📁 Contenuto test/:"
ls -la test

echo "🔧 Compilazione con make..."
make test

echo "🧪 Esecuzione test con misurazione risorse..."
/usr/bin/time -v ./test > output.log 2>&1
