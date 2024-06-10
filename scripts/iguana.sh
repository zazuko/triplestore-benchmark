#!/bin/sh

# Just make sure that the script don't fail if IGUANA_JVM is not set
IGUANA_JVM="${IGUANA_JVM}"

# Make the script fail in case of issue
set -eu

if [ -z "$IGUANA_JVM" ]; then
  java -jar iguana/iguana-*.jar "$1"
else
  java "$IGUANA_JVM" -jar iguana/iguana-*.jar "$1"
fi

exit 0
