#!/bin/bash
set -e

echo "==> Working dir:"
pwd

echo "==> File structure:"
ls -R .

echo "==> Looking for Python test files..."
find . -name "*test*.py"

echo "==> Running tests..."
/usr/bin/time -v python3 -m unittest discover -s . -p "*test*.py" > output.log 2>&1
