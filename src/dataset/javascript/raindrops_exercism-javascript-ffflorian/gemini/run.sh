#!/bin/bash
set -e

# Se serve un config implicito
echo '{}' > jest.config.json

# Esegui i test con Jest
/usr/bin/time -v npx jest --testMatch="**/*testSuite.js" --silent=false > output.log 2>&1
