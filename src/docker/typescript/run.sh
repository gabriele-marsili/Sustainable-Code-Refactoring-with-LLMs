#!/bin/bash
set -e

if [ -e node_modules ] && [ ! -L node_modules ]; then
  rm -rf node_modules
fi

ln -s /base/node_modules node_modules

echo "🧪 Esecuzione test con Jest..."
/usr/bin/time -v npx jest --json --outputFile=output.log 2> resource_usage.log || { echo "❌ Jest fallito" ; exit 1; }

echo "✅ Test completati"