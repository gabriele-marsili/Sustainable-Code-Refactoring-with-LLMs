#!/bin/bash
make test && /usr/bin/time -v ./test > output.log 2>&1
