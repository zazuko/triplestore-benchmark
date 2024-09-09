#!/bin/sh

# k6 is not able to list all files in a directory, so we need to keep a list of queries in a dedicated file.
# This script updates the list of queries in the query-files.json file, and requires jq to be installed.
# Usage: ./scripts/update-query-list.sh (from the root of the project)

find queries -type f -print0 \
  | jq -R -s 'split("\u0000")[:-1]' \
  > query-files.json
