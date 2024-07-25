# LINDAS Triplestore Benchmark

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

And inspect results in a human-readable format, run the following command:

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

The query timeout is set to 2min30s.
It will run 10 virtual users, that will run the maximum number of queries they can against the triplestore during 120s, and this for each query.

The results are stored in a file `./results/summary-benchmark.json`.

To inspect the results in a human-readable format, run the following command:

```sh
./scripts/summary-benchmark.sh
```
