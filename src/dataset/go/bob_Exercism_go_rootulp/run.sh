#!/bin/bash
set -e
echo "🧪 Esecuzione test con misurazione risorse..."

# Inizializza modulo Go se non esiste
if [ ! -f "go.mod" ]; then
    echo "Inizializzo modulo Go..."
    go mod init raindrops
fi

# Verifica struttura directory
echo "Struttura directory:"
find . -name "*.go" | head -10

# Crea un file go.mod appropriato per la struttura
cat > go.mod << EOF
module raindrops

go 1.21
EOF

# Esegui i test con misurazione risorse
/usr/bin/time -v go test ./test/... > output.log 2>&1