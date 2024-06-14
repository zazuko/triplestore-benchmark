# LINDAS Triplestore Benchmark

Welcome to the LINDAS Triplestore Benchmark repository! Here, you can explore SPARQL queries extracted from the Swiss government SPARQL endpoint, LINDAS, to benchmark and compare other triplestores.

## Baseline Comparison

Currently, we are in the process of preparing a baseline comparison of the LINDAS endpoint for future reference. Stay tuned for updates on this section.

## Requirements

Ensure you have the following prerequisites ready:

- [Java](https://www.java.com/en/)
- A snapshot of the LINDAS dataset, which you can download [here](https://zazuko-download.fra1.cdn.digitaloceanspaces.com/lindas/lindas_2024-06-14.nq.gz). The dataset is approximately 2.3 GB compressed and 60GB uncompressed.
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

