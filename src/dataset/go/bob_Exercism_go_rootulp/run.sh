#!/bin/bash
set -e
/usr/bin/time -v go test ./... > output.log 2>&1
