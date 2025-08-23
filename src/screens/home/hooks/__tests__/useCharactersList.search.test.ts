import { act } from '@testing-library/react-native';
import {
  setupMocks,
  mockUseInfinitePeople,
  createMockInfiniteQueryResult,
  createUseCharactersListTestSetup,
  expectSearchQueryUpdate,
} from './utils';

describe('useCharactersList - search functionality', () => {
  beforeEach(() => {
    setupMocks();
  });

  describe('when search query is updated', () => {
    it('should update search query and call useInfinitePeople with new value', () => {
      const setup = createUseCharactersListTestSetup();
      mockUseInfinitePeople.mockReturnValue(createMockInfiniteQueryResult());

      const { result } = setup.renderHook();

      act(() => {
        result.current.handleSearchChange('Luke');
      });

      expectSearchQueryUpdate(result, 'Luke');
    });
  });

  describe('when search query is cleared', () => {
    it('should update to empty string', () => {
      const setup = createUseCharactersListTestSetup();
      mockUseInfinitePeople.mockReturnValue(createMockInfiniteQueryResult());

      const { result } = setup.renderHook();

      act(() => {
        result.current.handleSearchChange('Luke');
      });

      act(() => {
        result.current.handleSearchChange('');
      });

      expectSearchQueryUpdate(result, '');
    });
  });
});
