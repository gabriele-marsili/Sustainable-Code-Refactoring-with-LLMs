#!/bin/bash
set -e
echo "🧪 Esecuzione test con misurazione risorse..."
/usr/bin/time -v go test ./... > output.log 2>&1
