# LINDAS Triplestore Benchmark

Welcome to the LINDAS Triplestore Benchmark repository!
Here, you can explore SPARQL queries extracted from the Swiss government SPARQL endpoint, LINDAS, to benchmark and compare other triplestores.

## Baseline Comparison

Currently, we are in the process of preparing a baseline comparison of the LINDAS endpoint for future reference.
Stay tuned for updates on this section.

## Requirements

Ensure you have the following prerequisites ready:

- [Java](https://www.java.com/en/)
- A snapshot of the LINDAS dataset, which you can download [here](https://download.zazukoians.org/lindas/lindas_2024-06-14.nq.gz).
  The dataset is approximately 2.3 GB compressed and 60GB uncompressed.
- A triplestore that you wish to test against.

We use [Iguana](https://github.com/dice-group/IGUANA) to benchmark the queries.

## Quick Start

To get started, follow these steps:

1. Run the fetch script to download Iguana from the specified GitHub release into the `iguana` directory:

   ```sh
   ./scripts/fetch-iguana.sh
   ```

   The script will pull the specified version of Iguana as stated in `scripts/fetch-iguana.sh`.

2. Execute the benchmark using the predetermined scenario by running:

   ```sh
   ./scripts/scenario-lindas.sh
   ```

   This command initiates the benchmark using the configuration outlined in `scenarios/lindas.yaml`.

## Using `k6`

We also provide some `k6` script to benchmark your SPAQRL endpoint or make sure it is compliant with the queries that are run against LINDAS.

More information about `k6` can be found [here](https://k6.io/).

## Conformity Test

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

And inspect results:

```sh
./scripts/summary-conformity.sh
```

## Benchmark

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

And inspect results:

```sh
./scripts/summary-benchmark.sh
```
