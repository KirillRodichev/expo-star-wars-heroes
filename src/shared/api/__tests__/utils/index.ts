import { Person, PeopleResponse } from '../../../entities/character/model/types';

export const mockPerson: Person = {
  name: 'Luke Skywalker',
  url: 'https://swapi.py4e.com/api/people/1/',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  birth_year: '19BBY',
  gender: 'male',
  homeworld: 'https://swapi.py4e.com/api/planets/1/',
  films: [],
  species: [],
  vehicles: [],
  starships: [],
  created: '2014-12-09T13:50:51.644000Z',
  edited: '2014-12-10T13:52:43.172000Z',
};

export const mockPeopleResponse: PeopleResponse = {
  count: 1,
  next: null,
  previous: null,
  results: [mockPerson],
};

export const createMockResponse = (data: any, ok = true, status = 200) => ({
  ok,
  status,
  json: jest.fn().mockResolvedValue(data),
}) as any;

export const createMockFetch = (mockResponses: any[] = []) => {
  const mockFetch = jest.fn();
  mockResponses.forEach(response => {
    mockFetch.mockResolvedValueOnce(response);
  });
  return mockFetch;
};

export const setupMocks = () => {
  jest.clearAllMocks();
};

export const expectHttpClientCall = (mockFetch: jest.MockedFunction<typeof fetch>, baseUrl: string, endpoint: string) => {
  expect(mockFetch).toHaveBeenCalledWith(`${baseUrl}${endpoint}`);
};

export const expectSuccessfulResponse = (result: any, expectedData: any) => {
  expect(result).toEqual(expectedData);
};

export const expectHttpError = (error: any, status: number) => {
  expect(error).toBeInstanceOf(Error);
  expect(error.message).toBe(`HTTP error! status: ${status}`);
};

export const expectNetworkError = (error: any, message: string) => {
  expect(error).toBeInstanceOf(Error);
  expect(error.message).toBe(message);
};
