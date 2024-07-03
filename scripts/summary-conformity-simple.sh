#!/bin/sh

# JSON input file
input_json="./results/summary-conformity.json"

# Extract and print query information
jq -r '
  .root_group.groups[] as $group |
  ($group.name | split(" ")[1]) as $query_number |
  ($group.checks[0].passes | tostring) as $passes |
  ($group.checks[0].fails | tostring) as $fails |
  "Query " + $query_number + ": " +
  $passes + "/" +
  (($passes | tonumber) + ($fails | tonumber) | tostring) + " passes (" +
  $fails + " failed)" +
  ", avg: " + (.metrics["query_" + $query_number + "_time"].values.avg | tostring) + " ms"
' "$input_json"

# Extract total information
total_queries=$(jq '.root_group.groups | length' "$input_json")
total_passes=$(jq '[.root_group.groups[].checks[0].passes] | add' "$input_json")
total_fails=$(jq '[.root_group.groups[].checks[0].fails] | add' "$input_json")
total_duration=$(jq '.state.testRunDurationMs' "$input_json")

echo
echo "TOTAL:"
echo "  - $total_queries queries ($total_passes passes, $total_fails failed)"
echo "  - $total_duration ms total duration time"
