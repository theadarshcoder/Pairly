import ky from 'ky';
import { env } from '../lib/env.js';

let authToken: string | null = null;

export function setAuthToken(token: string | null): void {
  authToken = token;
}

export const apiClient = ky.create({
  prefixUrl: env.API_URL,
  timeout: 15_000,
  retry: {
    limit: 2,
    methods: ['get'],
    statusCodes: [408, 502, 503, 504],
  },
  hooks: {
    beforeRequest: [
      (request) => {
        if (authToken) {
          request.headers.set('Authorization', `Bearer ${authToken}`);
        }
      },
    ],
    afterResponse: [
      async (_request, _options, response) => {
        if (response.status === 401) {
          setAuthToken(null);
        }
        return response;
      },
    ],
  },
});
