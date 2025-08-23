import { HttpClient } from '../base-client';
import {
  createMockResponse,
  createMockFetch,
  setupMocks,
  expectHttpClientCall,
  expectSuccessfulResponse,
  expectHttpError,
  expectNetworkError,
} from './utils';

globalThis.fetch = jest.fn();
const mockFetch = globalThis.fetch as jest.MockedFunction<typeof fetch>;

const createHttpClientTestSetup = (baseUrl: string) => {
  const client = new HttpClient(baseUrl);
  return { client };
};

describe('HttpClient', () => {
  const baseUrl = 'https://api.example.com';

  beforeEach(() => {
    setupMocks();
  });

  describe('constructor', () => {
    describe('given a base URL', () => {
      it('should create instance with base URL', () => {
        const { client } = createHttpClientTestSetup('https://test.com');
        expect(client).toBeInstanceOf(HttpClient);
      });
    });
  });

  describe('get method', () => {
    describe('given successful response', () => {
      it('should return parsed JSON data', async () => {
        const { client } = createHttpClientTestSetup(baseUrl);
        const mockData = { id: 1, name: 'Test' };
        mockFetch.mockResolvedValue(createMockResponse(mockData));

        const result = await client.get<typeof mockData>('/test');

        expectHttpClientCall(mockFetch, baseUrl, '/test');
        expectSuccessfulResponse(result, mockData);
      });
    });

    describe('given different endpoints', () => {
      it('should construct correct URLs', async () => {
        const { client } = createHttpClientTestSetup(baseUrl);
        const mockData = { success: true };
        const mockResponses = [
          createMockResponse(mockData),
          createMockResponse(mockData),
          createMockResponse(mockData),
        ];
        mockFetch.mockImplementation(createMockFetch(mockResponses));

        await client.get('/users');
        await client.get('/posts/123');
        await client.get('/search?q=test');

        expectHttpClientCall(mockFetch, baseUrl, '/users');
        expectHttpClientCall(mockFetch, baseUrl, '/posts/123');
        expectHttpClientCall(mockFetch, baseUrl, '/search?q=test');
      });
    });

    describe('given HTTP error response', () => {
      it('should throw error with status code', async () => {
        const { client } = createHttpClientTestSetup(baseUrl);
        mockFetch.mockResolvedValue(createMockResponse(null, false, 404));

        await expect(client.get('/not-found')).rejects.toThrow('HTTP error! status: 404');
      });
    });

    describe('given 500 server error', () => {
      it('should throw error with status code', async () => {
        const { client } = createHttpClientTestSetup(baseUrl);
        mockFetch.mockResolvedValue(createMockResponse(null, false, 500));

        await expect(client.get('/server-error')).rejects.toThrow('HTTP error! status: 500');
      });
    });

    describe('given network error', () => {
      it('should throw network error', async () => {
        const { client } = createHttpClientTestSetup(baseUrl);
        const networkError = new Error('Network error');
        mockFetch.mockRejectedValue(networkError);

        await expect(client.get('/network-fail')).rejects.toThrow('Network error');
      });
    });

    describe('given invalid JSON response', () => {
      it('should throw JSON parsing error', async () => {
        const { client } = createHttpClientTestSetup(baseUrl);
        const mockResponse = {
          ok: true,
          status: 200,
          json: jest.fn().mockRejectedValue(new Error('Invalid JSON')),
        } as any;
        mockFetch.mockResolvedValue(mockResponse);

        await expect(client.get('/invalid-json')).rejects.toThrow('Invalid JSON');
      });
    });
  });
});
