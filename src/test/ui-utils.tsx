import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const createTestQueryClient = () => {
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

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  queryClient?: QueryClient;
}

const createTestWrapper = (queryClient: QueryClient) => {
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export const renderWithProviders = (
  ui: ReactElement,
  options: CustomRenderOptions = {}
) => {
  const { queryClient = createTestQueryClient(), ...renderOptions } = options;
  const wrapper = createTestWrapper(queryClient);

  return {
    ...render(ui, { wrapper, ...renderOptions }),
    queryClient,
  };
};

export const createMockFunction = () => jest.fn();

export const expectElementToBeVisible = (element: any) => {
  expect(element).toBeVisible();
};

export const expectElementToHaveText = (element: any, text: string) => {
  expect(element).toHaveTextContent(text);
};

export const expectElementToBeDisabled = (element: any) => {
  expect(element).toBeDisabled();
};

export const expectElementToBeEnabled = (element: any) => {
  expect(element).toBeEnabled();
};

export const expectFunctionToHaveBeenCalledWith = (mockFn: jest.Mock, ...args: any[]) => {
  expect(mockFn).toHaveBeenCalledWith(...args);
};

export const expectFunctionToHaveBeenCalledTimes = (mockFn: jest.Mock, times: number) => {
  expect(mockFn).toHaveBeenCalledTimes(times);
};


