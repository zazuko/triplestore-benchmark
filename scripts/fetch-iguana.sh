#!/bin/sh

# Make the script fail in case of issue
set -eu

# Configuration
IGUANA_VERSION="3.3.3"

# Remove the current version of Iguana (if any) and archives in case of previous failures
rm -rf iguana
rm -f iguana-*.zip iguana-*.zip.*

# Fetches the latest Iguana binaries from the GitHub release
wget "https://github.com/dice-group/IGUANA/releases/download/v${IGUANA_VERSION}/iguana-${IGUANA_VERSION}.zip"
unzip "iguana-${IGUANA_VERSION}.zip"
rm -f "iguana-${IGUANA_VERSION}.zip"
chmod +x iguana/start-iguana.sh

exit 0
