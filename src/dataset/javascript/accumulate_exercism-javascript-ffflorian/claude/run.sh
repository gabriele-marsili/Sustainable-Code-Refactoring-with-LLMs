#!/bin/bash
set -e

echo "🕵️  Analisi file JS per determinare se usare ESM o CommonJS..."

# Cerca tutti i file JS nel progetto
all_js_files=$(find . -name "*.js")

# Rileva ESM se trovi almeno un `import` o `export` in qualsiasi file
if grep -Eq '^[[:space:]]*(import|export)\s' $all_js_files; then
  mode="esm"
else
  mode="commonjs"
fi

# Backup del package.json
cp package.json package.json.bak

# Modifica il type nel package.json se serve
if [ "$mode" = "esm" ]; then
  echo "⚙️  Rilevato codice con import/export → ESM"
  # Aggiungi `"type": "module"` nel package.json
  jq '. + {type: "module"}' package.json.bak > package.json
else
  echo "⚙️  Nessun import/export → CommonJS"
  # Rimuovi il campo "type" se presente
  jq 'del(.type)' package.json.bak > package.json
fi

# Installa le dipendenze
npm install

# Avvia Jest
if [ "$mode" = "esm" ]; then
  echo "▶️  Avvio Jest in modalità ESM"
  /usr/bin/time -v node --experimental-vm-modules ./node_modules/.bin/jest \
    --config=jest.config.js \
    --testMatch="**/*testSuite.js" \
    --testMatch='**/*.test.{ts,js}' \
    --silent=false > output.log 2>&1
else
  echo "▶️  Avvio Jest in modalità CommonJS"
  /usr/bin/time -v ./node_modules/.bin/jest \
    --config=jest.config.js \
    --testMatch="**/*testSuite.js" \
    --testMatch='**/*.test.{ts,js}' \
    --silent=false > output.log 2>&1
fi

# Ripristina il package.json originale
mv package.json.bak package.json
