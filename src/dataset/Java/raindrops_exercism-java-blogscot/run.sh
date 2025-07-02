#!/bin/bash
javac *.java && /usr/bin/time -v java Main > output.log 2>&1
