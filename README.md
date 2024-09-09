# LINDAS Triplestore Benchmark

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/?autostart=true&editor=code#https://github.com/zazuko/lindas-benchmark)

Welcome to the LINDAS Triplestore Benchmark repository!
Here, you can explore SPARQL queries extracted from the Swiss government SPARQL endpoint, LINDAS, to benchmark and compare other triplestores.

## Baseline Comparison

Currently, we are in the process of preparing a baseline comparison of the LINDAS endpoint for future reference.
Stay tuned for updates on this section.

## Requirements

Ensure you have the following prerequisites ready:

- [k6](https://k6.io/docs/get-started/installation/)
- A snapshot of the LINDAS dataset, which you can download [here](https://download.zazukoians.org/lindas/lindas_2024-06-14.nq.gz).
  The dataset is approximately 2.3 GB compressed and 60GB uncompressed.
- A triplestore that you wish to test against.

We use [k6](https://k6.io/) to benchmark the queries.
We also provide a quick way to check if the triplestore is compliant with the queries that are run against LINDAS.

## Quick Start

All SPARQL queries that are used in the differents tests are stored in the `queries` folder.

In case you add/remove/rename a query, you need to update the `query-files.json` file, by running the following command:

```sh
./scripts/update-query-list.sh
```

### Conformity Test

Check that your triplestore is able to support some common queries against the LINDAS dataset:

```sh
k6 run \
  -e SPARQL_ENDPOINT=https://example.com/query \
  -e SPARQL_USERNAME=user \
  -e SPARQL_PASSWORD=secret \
  lindas-conformity.js
```

The query timeout is set to 5min.
The script has a limit of 1 day to run.

This will run the queries against the triplestore and check if they are able to return a result.
The results are stored in a file `./results/summary-conformity.json`.

And inspect results in a human-readable format, run the following command (`jq` is required):

```sh
./scripts/summary-conformity-simple.sh
```

### Benchmark

Run the benchmark against your triplestore:

```sh
k6 run \
  -e SPARQL_ENDPOINT=https://example.com/query \
  -e SPARQL_USERNAME=user \
  -e SPARQL_PASSWORD=secret \
  lindas-benchmark.js
```

In case you want to run the benchmark on some specific queries (it can be useful in order to check that it can hit your endpoint as expected), you can add those parameters:

- `-e START=0`: The index of the first query to run (default: `0`)
- `-e END=1125`: The index of the last query to run (default: `1125`)

The query timeout is set to 2min30s.
It will run 10 virtual users, that will run the maximum number of queries they can against the triplestore during 120s, and this for each query.

The results are stored in a file `./results/summary-benchmark-YYYY-MM-DDTHH-MM-SS.json`.

To inspect the results in a human-readable format, run the following command (`jq` is required):

```sh
./scripts/summary-benchmark.sh ./results/summary-benchmark-YYYY-MM-DDTHH-MM-SS.json
```

by updating the path to the JSON file you want to inspect.
