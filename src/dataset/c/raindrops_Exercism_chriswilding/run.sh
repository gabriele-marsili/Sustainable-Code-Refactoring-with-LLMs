#!/bin/bash
gcc -o main src/*.c test/*.c && /usr/bin/time -v ./main > output.log 2>&1
