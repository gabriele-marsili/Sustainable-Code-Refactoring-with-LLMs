#!/bin/bash
set -e

echo "🔧 Compilazione con make..."
make

if [ ! -f ./tests.out ]; then
  echo "❌ Compilazione fallita: ./tests.out non trovato"
  exit 1
fi

echo "🧪 Esecuzione test con misurazione risorse..."
/usr/bin/time -v ./tests.out > output.log 2>&1
