#!/bin/bash
set -e
tsc --project tsconfig.json
/usr/bin/time -v npx jest *.test.js > output.log 2>&1
