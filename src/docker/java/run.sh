#!/bin/bash
set -e
find . -name "*.java" > sources.txt
javac @sources.txt
/usr/bin/time -v java -jar junit-platform-console-standalone.jar \
  --classpath . \
  --scan-classpath > output.log 2>&1
