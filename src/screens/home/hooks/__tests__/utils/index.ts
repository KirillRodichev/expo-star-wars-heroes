import { renderHook } from '@testing-library/react-native';
import { useCharactersList } from '../../useCharactersList';
import { useInfinitePeople } from '../../../../../entities/character/api';
import { Person } from '../../../../../entities/character/model/types';

jest.mock('../../../../../entities/character/api');

export const mockUseInfinitePeople = useInfinitePeople as jest.MockedFunction<typeof useInfinitePeople>;

export const mockLuke: Person = {
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

export const mockVader: Person = {
  name: 'Darth Vader',
  url: 'https://swapi.py4e.com/api/people/4/',
  height: '202',
  mass: '136',
  hair_color: 'none',
  skin_color: 'white',
  eye_color: 'yellow',
  birth_year: '41.9BBY',
  gender: 'male',
  homeworld: 'https://swapi.py4e.com/api/planets/1/',
  films: [],
  species: [],
  vehicles: [],
  starships: [],
  created: '2014-12-10T15:18:20.704000Z',
  edited: '2014-12-20T21:17:50.313000Z',
};

export const createMockInfiniteQueryResult = (overrides = {}) => ({
  data: {
    pages: [
      { results: [mockLuke], next: 'page2' },
      { results: [mockVader], next: null }
    ]
  },
  fetchNextPage: jest.fn(),
  fetchPreviousPage: jest.fn(),
  hasNextPage: false,
  hasPreviousPage: false,
  isFetchingNextPage: false,
  isFetchingPreviousPage: false,
  isFetchNextPageError: false,
  isFetchPreviousPageError: false,
  isLoading: false,
  isError: false,
  error: null,
  refetch: jest.fn(),
  isPending: false,
  isPaused: false,
  isRefetching: false,
  isStale: false,
  dataUpdatedAt: Date.now(),
  errorUpdatedAt: 0,
  failureCount: 0,
  failureReason: null,
  errorUpdateCount: 0,
  isFetched: true,
  isFetchedAfterMount: true,
  isInitialLoading: false,
  isLoadingError: false,
  isPlaceholderData: false,
  isRefetchError: false,
  isSuccess: true,
  status: 'success' as const,
  fetchStatus: 'idle' as const,
  ...overrides,
} as any);

export const createUseCharactersListTestSetup = () => {
  const renderHookResult = () => renderHook(() => useCharactersList());
  return { renderHook: renderHookResult };
};

export const setupMocks = () => {
  jest.clearAllMocks();
};

export const expectSuccessfulInitialization = (result: any) => {
  expect(result.current.searchQuery).toBe('');
  expect(result.current.allCharacters).toEqual([mockLuke, mockVader]);
  expect(result.current.isLoading).toBe(false);
  expect(result.current.isError).toBe(false);
};

export const expectLoadingState = (result: any) => {
  expect(result.current.isLoading).toBe(true);
  expect(result.current.allCharacters).toEqual([]);
};

export const expectErrorState = (result: any, errorMessage: string) => {
  expect(result.current.isError).toBe(true);
  expect(result.current.error).toBe(errorMessage);
  expect(result.current.allCharacters).toEqual([]);
};

export const expectSearchQueryUpdate = (result: any, query: string) => {
  expect(result.current.searchQuery).toBe(query);
  expect(mockUseInfinitePeople).toHaveBeenLastCalledWith(query);
};

export const expectFetchNextPageCalled = (fetchNextPage: jest.Mock) => {
  expect(fetchNextPage).toHaveBeenCalledTimes(1);
};

export const expectFetchNextPageNotCalled = (fetchNextPage: jest.Mock) => {
  expect(fetchNextPage).not.toHaveBeenCalled();
};

export const expectFetchingNextPageState = (result: any) => {
  expect(result.current.isFetchingNextPage).toBe(true);
};

export const expectCharactersAggregation = (result: any, characters: Person[]) => {
  expect(result.current.allCharacters).toEqual(characters);
};

export const expectEmptyCharactersList = (result: any) => {
  expect(result.current.allCharacters).toEqual([]);
};

export const expectRefetchCalled = (refetch: jest.Mock) => {
  expect(refetch).toHaveBeenCalledTimes(1);
};
