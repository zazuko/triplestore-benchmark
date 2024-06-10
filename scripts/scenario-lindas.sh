#!/bin/sh

# Make the script fail in case of issue
set -eu

mkdir -p results
./scripts/iguana.sh ./scenarios/lindas.yaml

exit 0
