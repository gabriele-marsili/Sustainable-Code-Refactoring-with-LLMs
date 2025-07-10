#!/bin/bash
set -e
/usr/bin/time -v python3 -m unittest discover > output.log 2>&1
