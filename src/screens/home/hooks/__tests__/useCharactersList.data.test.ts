import { act } from '@testing-library/react-native';
import {
  setupMocks,
  mockUseInfinitePeople,
  mockLuke,
  mockVader,
  createMockInfiniteQueryResult,
  createUseCharactersListTestSetup,
  expectCharactersAggregation,
  expectEmptyCharactersList,
  expectRefetchCalled,
} from './utils';

describe('useCharactersList - data aggregation', () => {
  beforeEach(() => {
    setupMocks();
  });

  describe('given multiple pages of data', () => {
    it('should flatten all pages into single characters array', () => {
      const setup = createUseCharactersListTestSetup();
      const page1Character = { ...mockLuke, name: 'Page 1 Character' };
      const page2Character = { ...mockVader, name: 'Page 2 Character' };
      const page3Character = { ...mockLuke, name: 'Page 3 Character' };

      mockUseInfinitePeople.mockReturnValue(
        createMockInfiniteQueryResult({
          data: {
            pages: [
              { results: [page1Character], next: 'page2' },
              { results: [page2Character], next: 'page3' },
              { results: [page3Character], next: null }
            ]
          }
        })
      );

      const { result } = setup.renderHook();

      expectCharactersAggregation(result, [
        page1Character,
        page2Character,
        page3Character
      ]);
    });
  });

  describe('given no data', () => {
    it('should return empty array', () => {
      const setup = createUseCharactersListTestSetup();
      mockUseInfinitePeople.mockReturnValue(
        createMockInfiniteQueryResult({ data: undefined })
      );

      const { result } = setup.renderHook();

      expectEmptyCharactersList(result);
    });
  });

  describe('given empty pages', () => {
    it('should return empty array', () => {
      const setup = createUseCharactersListTestSetup();
      mockUseInfinitePeople.mockReturnValue(
        createMockInfiniteQueryResult({
          data: { pages: [] }
        })
      );

      const { result } = setup.renderHook();

      expectEmptyCharactersList(result);
    });
  });
});

describe('useCharactersList - refetch functionality', () => {
  beforeEach(() => {
    setupMocks();
  });

  describe('when refetch is called', () => {
    it('should call the underlying refetch function', () => {
      const setup = createUseCharactersListTestSetup();
      const refetch = jest.fn();
      mockUseInfinitePeople.mockReturnValue(
        createMockInfiniteQueryResult({ refetch })
      );

      const { result } = setup.renderHook();

      act(() => {
        result.current.refetch();
      });

      expectRefetchCalled(refetch);
    });
  });
});
