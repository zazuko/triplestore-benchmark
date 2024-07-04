import http from 'k6/http';
import { check, group } from 'k6';
import encoding from 'k6/encoding';
import { SharedArray, } from 'k6/data';
import { Trend } from 'k6/metrics';

const stepDuration = 120; // seconds

const endpoint = __ENV.SPARQL_ENDPOINT;

let authorizationHeader = null;

// Define the username and password
const username = __ENV.SPARQL_USERNAME;
const password = __ENV.SPARQL_PASSWORD;

if (username && password) {
  // Encode the credentials in base64
  const encodedCredentials = encoding.b64encode(`${username}:${password}`);
  // Define the headers with the Authorization header
  authorizationHeader = `Basic ${encodedCredentials}`;
}

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'Accept': 'application/n-triples,*/*;q=0.9',
};
if (authorizationHeader) {
  headers['Authorization'] = authorizationHeader;
}

const queries = new SharedArray('queries', function () {
  return open('./queries/lindas-queries-2023-11.sparql').split('\n###\n').map((q) => q.trim()).filter((q) => q.length > 0);
});

const trends = []
const scenarios = {}
for (let i = 0; i < queries.length; i++) {
  scenarios[`query_${i}`] = {
    executor: 'constant-vus',
    vus: 10,
    duration: `${stepDuration}s`,
    env: {
      QUERY_ID: `${i}`,
    },
    startTime: `${i * stepDuration}s`,
    gracefulStop: `${stepDuration}s`,
  };
  trends.push(new Trend(`query_${i}_duration`, true));
}

export const options = {
  scenarios,
};

export default function () {
  const queryId = __ENV.QUERY_ID;
  const query = queries[queryId];
  const trend = trends[queryId];

  group(`Query#${queryId}`, () => {
    const response = http.post(endpoint, {
      query,
      tags: { name: `query_${queryId}` }
    }, {
      headers,
      timeout: '2m30s',
    });

    trend.add(response.timings.duration);

    check(response, {
      'is status 200': (r) => r.status === 200,
    });
  });
}

export function handleSummary (data) {
  return {
    './results/summary-benchmark.json': JSON.stringify(data, null, 2),
  };
}
