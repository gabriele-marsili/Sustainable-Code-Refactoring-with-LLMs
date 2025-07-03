#!/bin/bash
set -e

echo "📁 Contenuto iniziale di /app:"
ls -al /app

# Rimuove node_modules solo se non è un symlink
if [ -e node_modules ] && [ ! -L node_modules ]; then
  echo "🧹 Rimuovo node_modules preesistente (non symlink)"
  rm -rf node_modules
fi

echo "📦 Link dei moduli npm da /base/node_modules"
ln -s /base/node_modules node_modules

echo "🔨 Compilazione TypeScript..."
npx tsc || { echo "❌ tsc fallito"; exit 1; }

echo "🧪 Esecuzione test con Jest..."
npx jest --json --outputFile=output.log || { echo "❌ Jest fallito"; exit 1; }

echo "✅ Test completati"
