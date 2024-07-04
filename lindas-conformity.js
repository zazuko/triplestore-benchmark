import http from 'k6/http';
import { check, group } from 'k6';
import encoding from 'k6/encoding';
import { Trend } from 'k6/metrics';

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

const queries = open('./queries/lindas-queries-2023-11.sparql').split('\n###\n').map((q) => q.trim()).filter((q) => q.length > 0);
const queryLength = queries.length;

export function handleSummary (data) {
  return {
    './results/summary-conformity.json': JSON.stringify(data, null, 2),
  };
}

// Configure options
export let options = {
  scenarios: {
    'lindas-conformity': {
      executor: 'shared-iterations',
      vus: 1,
      maxDuration: '1d',
    },
  },
};

// Create a custom metric for each query's execution time
let queryTrends = queries.map((_query, index) => new Trend(`query_${index}_time`));

// Create a custom metric for total execution time
const totalTrend = new Trend('total_execution_time');

export default function () {
  const totalStart = new Date();

  for (let i = 0; i < queryLength; i++) {
    const query = queries[i];

    group(`Query ${i}`, function () {
      const start = new Date();

      console.log(`Query#${i}/${queryLength - 1}: ${query}\n\n`);
      const res = http.post(endpoint, {
        query,
      }, {
        headers,
        timeout: '5m',
      });

      const end = new Date();
      const duration = end - start;

      queryTrends[i].add(duration);

      check(res, {
        'is status 200': (r) => r.status === 200,
      });
    });
  }

  const totalEnd = new Date();
  const totalDuration = totalEnd - totalStart;

  totalTrend.add(totalDuration);
}
