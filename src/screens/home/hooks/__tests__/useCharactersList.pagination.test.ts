import { act } from '@testing-library/react-native';
import {
  setupMocks,
  mockUseInfinitePeople,
  createMockInfiniteQueryResult,
  createUseCharactersListTestSetup,
  expectFetchNextPageCalled,
  expectFetchNextPageNotCalled,
  expectFetchingNextPageState,
} from './utils';

describe('useCharactersList - pagination functionality', () => {
  beforeEach(() => {
    setupMocks();
  });

  describe('when handleEndReached is called', () => {
    describe('given has next page and not currently fetching', () => {
      it('should call fetchNextPage', () => {
        const setup = createUseCharactersListTestSetup();
        const fetchNextPage = jest.fn();
        mockUseInfinitePeople.mockReturnValue(
          createMockInfiniteQueryResult({ 
            hasNextPage: true, 
            isFetchingNextPage: false,
            fetchNextPage 
          })
        );

        const { result } = setup.renderHook();

        act(() => {
          result.current.handleEndReached();
        });

        expectFetchNextPageCalled(fetchNextPage);
      });
    });

    describe('given no next page', () => {
      it('should not call fetchNextPage', () => {
        const setup = createUseCharactersListTestSetup();
        const fetchNextPage = jest.fn();
        mockUseInfinitePeople.mockReturnValue(
          createMockInfiniteQueryResult({ 
            hasNextPage: false, 
            isFetchingNextPage: false,
            fetchNextPage 
          })
        );

        const { result } = setup.renderHook();

        act(() => {
          result.current.handleEndReached();
        });

        expectFetchNextPageNotCalled(fetchNextPage);
      });
    });

    describe('given currently fetching next page', () => {
      it('should not call fetchNextPage', () => {
        const setup = createUseCharactersListTestSetup();
        const fetchNextPage = jest.fn();
        mockUseInfinitePeople.mockReturnValue(
          createMockInfiniteQueryResult({ 
            hasNextPage: true, 
            isFetchingNextPage: true,
            fetchNextPage 
          })
        );

        const { result } = setup.renderHook();

        act(() => {
          result.current.handleEndReached();
        });

        expectFetchNextPageNotCalled(fetchNextPage);
      });
    });
  });

  describe('when fetching next page', () => {
    it('should show fetching state', () => {
      const setup = createUseCharactersListTestSetup();
      mockUseInfinitePeople.mockReturnValue(
        createMockInfiniteQueryResult({ isFetchingNextPage: true })
      );

      const { result } = setup.renderHook();

      expectFetchingNextPageState(result);
    });
  });
});
