import { renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { Person, PeopleResponse } from '../../model/types';

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

export const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });
};

export const createWrapper = (queryClient: QueryClient) => {
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export const createReactQueryTestSetup = () => {
  const queryClient = createQueryClient();
  const wrapper = createWrapper(queryClient);
  
  const renderHookWithProvider = <TProps, TResult>(
    hook: (props: TProps) => TResult,
    options?: { initialProps?: TProps }
  ) => {
    return renderHook(hook, { wrapper, ...options });
  };

  return { queryClient, wrapper, renderHookWithProvider };
};

export const setupMocks = () => {
  jest.clearAllMocks();
};

export const expectQueryKey = (queryKey: any[], expectedKey: any[]) => {
  expect(queryKey).toEqual(expectedKey);
};

export const expectQuerySuccess = (result: any, expectedData: any) => {
  expect(result.current.isSuccess).toBe(true);
  expect(result.current.data).toEqual(expectedData);
};

export const expectQueryLoading = (result: any) => {
  expect(result.current.isLoading).toBe(true);
};

export const expectQueryError = (result: any, expectedError: string) => {
  expect(result.current.isError).toBe(true);
  expect(result.current.error?.message).toBe(expectedError);
};

export const expectInfiniteQuerySuccess = (result: any, expectedPages: any[]) => {
  expect(result.current.isSuccess).toBe(true);
  expect(result.current.data?.pages).toEqual(expectedPages);
};

export const expectInfiniteQueryHasNextPage = (result: any, hasNext: boolean) => {
  expect(result.current.hasNextPage).toBe(hasNext);
};
