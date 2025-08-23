import {
  setupMocks,
  mockUseInfinitePeople,
  createMockInfiniteQueryResult,
  createUseCharactersListTestSetup,
  expectSuccessfulInitialization,
  expectLoadingState,
  expectErrorState,
} from './utils';

describe('useCharactersList - initialization behavior', () => {
  beforeEach(() => {
    setupMocks();
  });

  describe('given successful data loading', () => {
    it('should initialize with empty search and aggregated characters', () => {
      const setup = createUseCharactersListTestSetup();
      mockUseInfinitePeople.mockReturnValue(createMockInfiniteQueryResult());

      const { result } = setup.renderHook();

      expectSuccessfulInitialization(result);
    });
  });

  describe('given loading state', () => {
    it('should show loading state', () => {
      const setup = createUseCharactersListTestSetup();
      mockUseInfinitePeople.mockReturnValue(
        createMockInfiniteQueryResult({ 
          isLoading: true, 
          data: undefined,
          status: 'pending'
        })
      );

      const { result } = setup.renderHook();

      expectLoadingState(result);
    });
  });

  describe('given error state', () => {
    it('should show error state with message', () => {
      const setup = createUseCharactersListTestSetup();
      const errorMessage = 'Network error';
      mockUseInfinitePeople.mockReturnValue(
        createMockInfiniteQueryResult({ 
          isError: true, 
          error: { message: errorMessage } as Error,
          data: undefined,
          status: 'error'
        })
      );

      const { result } = setup.renderHook();

      expectErrorState(result, errorMessage);
    });
  });

  describe('given error without message', () => {
    it('should show default error message', () => {
      const setup = createUseCharactersListTestSetup();
      mockUseInfinitePeople.mockReturnValue(
        createMockInfiniteQueryResult({ 
          isError: true, 
          error: {} as Error,
          data: undefined,
          status: 'error'
        })
      );

      const { result } = setup.renderHook();

      expectErrorState(result, 'Unknown error');
    });
  });
});
