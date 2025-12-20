// src/utils/csrf.ts
import axios from 'axios';

let _csrfToken: string | null = null;

interface CSRFTokenResponse {
  csrfToken: string;
}

export const getCSRFToken = async (): Promise<string> => {
  // Return cached token if available
  if (_csrfToken !== null) {
    return _csrfToken;
  }

  // Use relative URL since frontend and backend are served from same origin
  const response = await axios.get<CSRFTokenResponse>(
    '/api/csrf-token',
    { withCredentials: true }
  );

  // Validate response structure
  if (!response.data?.csrfToken) {
    throw new Error('Invalid CSRF token response: missing token');
  }

  // Validate token type
  const token = response.data.csrfToken;
  if (typeof token !== 'string') {
    throw new Error('Invalid CSRF token response: token is not a string');
  }

  // Store and return the validated token
  _csrfToken = token;
  return _csrfToken; // TypeScript now knows this is definitely string
};

export const resetCSRFToken = (): void => {
  _csrfToken = null;
};