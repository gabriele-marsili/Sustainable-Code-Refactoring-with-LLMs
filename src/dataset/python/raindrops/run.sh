#!/bin/bash
/usr/bin/time -v python3 -m pytest *.py > output.log 2>&1
