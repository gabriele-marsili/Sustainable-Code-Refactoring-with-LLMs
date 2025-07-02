#!/bin/bash
g++ -o main src/*.cpp test/*.cpp && /usr/bin/time -v ./main > output.log 2>&1
