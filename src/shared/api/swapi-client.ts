import { HttpClient } from './base-client';

const SWAPI_BASE_URL = 'https://swapi.py4e.com/api';

export const swapiClient = new HttpClient(SWAPI_BASE_URL);

export const swapiUtils = {
  extractIdFromUrl: (url: string): string => {
    const matches = url.match(/\/(\d+)\/$/);
    return matches ? matches[1] : '';
  },

  buildQueryString: (params: Record<string, string | number | undefined>): string => {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, value.toString());
      }
    });

    const queryString = searchParams.toString();
    return queryString ? `?${queryString}` : '';
  },
};
