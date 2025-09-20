#!/bin/bash
set -e
echo "🧪 Esecuzione test con misurazione risorse..."

# Mostra la struttura
echo "Struttura directory:"
find . -name "*.go" | head -10

# Crea un go.mod fittizio (modulo locale)
if [ ! -f "go.mod" ]; then
    echo "Inizializzo go.mod..."
    go mod init esercizio
fi

# Sovrascrive comunque per sicurezza
cat > go.mod << EOF
module esercizio

go 1.21
EOF

# Esegui test Go
/usr/bin/time -v go test -v > output.log 2>&1 || true
