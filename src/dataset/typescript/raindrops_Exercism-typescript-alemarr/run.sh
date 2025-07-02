#!/bin/bash
tsc *.ts && /usr/bin/time -v node *.js > output.log 2>&1
