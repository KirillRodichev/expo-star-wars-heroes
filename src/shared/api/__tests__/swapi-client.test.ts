import { swapiClient, swapiUtils } from '../swapi-client';
import { HttpClient } from '../base-client';

jest.mock('../base-client');

const MockHttpClient = HttpClient as jest.MockedClass<typeof HttpClient>;

const createSwapiClientTestSetup = () => {
  return { swapiClient, swapiUtils };
};



describe('swapiUtils', () => {
  describe('extractIdFromUrl', () => {
    describe('given valid SWAPI URL', () => {
      it('should extract ID from people URL', () => {
        const { swapiUtils } = createSwapiClientTestSetup();
        const url = 'https://swapi.py4e.com/api/people/1/';
        const result = swapiUtils.extractIdFromUrl(url);
        expect(result).toBe('1');
      });
    });

    describe('given invalid URL format', () => {
      it('should return empty string for URL without ID', () => {
        const { swapiUtils } = createSwapiClientTestSetup();
        const url = 'https://swapi.py4e.com/api/people/';
        const result = swapiUtils.extractIdFromUrl(url);
        expect(result).toBe('');
      });

      it('should return empty string for URL without trailing slash', () => {
        const { swapiUtils } = createSwapiClientTestSetup();
        const url = 'https://swapi.py4e.com/api/people/1';
        const result = swapiUtils.extractIdFromUrl(url);
        expect(result).toBe('');
      });

      it('should return empty string for completely invalid URL', () => {
        const { swapiUtils } = createSwapiClientTestSetup();
        const url = 'not-a-valid-url';
        const result = swapiUtils.extractIdFromUrl(url);
        expect(result).toBe('');
      });

      it('should return empty string for empty string', () => {
        const { swapiUtils } = createSwapiClientTestSetup();
        const result = swapiUtils.extractIdFromUrl('');
        expect(result).toBe('');
      });
    });
  });

  describe('buildQueryString', () => {
    describe('given valid parameters', () => {
      it('should build query string with single parameter', () => {
        const { swapiUtils } = createSwapiClientTestSetup();
        const params = { search: 'luke' };
        const result = swapiUtils.buildQueryString(params);
        expect(result).toBe('?search=luke');
      });

      it('should build query string with multiple parameters', () => {
        const { swapiUtils } = createSwapiClientTestSetup();
        const params = { search: 'luke', page: 2 };
        const result = swapiUtils.buildQueryString(params);
        expect(result).toBe('?search=luke&page=2');
      });

      it('should handle number parameters', () => {
        const { swapiUtils } = createSwapiClientTestSetup();
        const params = { page: 1, limit: 10 };
        const result = swapiUtils.buildQueryString(params);
        expect(result).toBe('?page=1&limit=10');
      });

      it('should handle string with spaces', () => {
        const { swapiUtils } = createSwapiClientTestSetup();
        const params = { search: 'darth vader' };
        const result = swapiUtils.buildQueryString(params);
        expect(result).toBe('?search=darth+vader');
      });

      it('should handle special characters', () => {
        const { swapiUtils } = createSwapiClientTestSetup();
        const params = { search: 'c-3po & r2-d2' };
        const result = swapiUtils.buildQueryString(params);
        expect(result).toBe('?search=c-3po+%26+r2-d2');
      });
    });

    describe('given undefined values', () => {
      it('should skip undefined parameters', () => {
        const { swapiUtils } = createSwapiClientTestSetup();
        const params = { search: 'luke', page: undefined, limit: 10 };
        const result = swapiUtils.buildQueryString(params);
        expect(result).toBe('?search=luke&limit=10');
      });

      it('should return empty string when all parameters are undefined', () => {
        const { swapiUtils } = createSwapiClientTestSetup();
        const params = { search: undefined, page: undefined };
        const result = swapiUtils.buildQueryString(params);
        expect(result).toBe('');
      });
    });

    describe('given empty parameters', () => {
      it('should return empty string for empty object', () => {
        const { swapiUtils } = createSwapiClientTestSetup();
        const params = {};
        const result = swapiUtils.buildQueryString(params);
        expect(result).toBe('');
      });

      it('should include empty string values', () => {
        const { swapiUtils } = createSwapiClientTestSetup();
        const params = { search: '', page: 1 };
        const result = swapiUtils.buildQueryString(params);
        expect(result).toBe('?search=&page=1');
      });

      it('should include zero values', () => {
        const { swapiUtils } = createSwapiClientTestSetup();
        const params = { page: 0, limit: 0 };
        const result = swapiUtils.buildQueryString(params);
        expect(result).toBe('?page=0&limit=0');
      });
    });
  });
});
