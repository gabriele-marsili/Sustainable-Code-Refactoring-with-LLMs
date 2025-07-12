#!/bin/bash
set -e

echo "🔧 Compilazione con make..."
make

if [ ! -f ./test ]; then
  echo "❌ Compilazione fallita: ./test non trovato"
  exit 1
fi

echo "🧪 Esecuzione test con misurazione risorse..."
/usr/bin/time -v ./test > output.log 2>&1
