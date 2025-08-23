import { renderHook, waitFor } from '@testing-library/react-native';
import { useInfinitePeople, usePerson, characterQueryKeys } from '../character-queries';
import { characterApi } from '../character-api';
import { mockPerson, mockPeopleResponse, createReactQueryTestSetup, setupMocks } from './utils';

jest.mock('../character-api');
jest.mock('../../../../shared/lib/useDebounce', () => ({
  useDebounce: jest.fn((value) => value),
}));

const mockCharacterApi = characterApi as jest.Mocked<typeof characterApi>;

describe('characterQueryKeys', () => {
  describe('all', () => {
    it('should return base query key', () => {
      const result = characterQueryKeys.all();
      expect(result).toEqual(['characters']);
    });
  });

  describe('lists', () => {
    it('should return lists query key', () => {
      const result = characterQueryKeys.lists();
      expect(result).toEqual(['characters', 'list']);
    });
  });

  describe('list', () => {
    it('should return list query key with params', () => {
      const params = { search: 'luke', page: 1 };
      const result = characterQueryKeys.list(params);
      expect(result).toEqual(['characters', 'list', params]);
    });
  });

  describe('infinite', () => {
    it('should return infinite query key with search', () => {
      const result = characterQueryKeys.infinite('luke');
      expect(result).toEqual(['characters', 'list', 'infinite', 'luke']);
    });

    it('should return infinite query key without search', () => {
      const result = characterQueryKeys.infinite();
      expect(result).toEqual(['characters', 'list', 'infinite', undefined]);
    });
  });

  describe('details', () => {
    it('should return details query key', () => {
      const result = characterQueryKeys.details();
      expect(result).toEqual(['characters', 'detail']);
    });
  });

  describe('detail', () => {
    it('should return detail query key with id', () => {
      const result = characterQueryKeys.detail('1');
      expect(result).toEqual(['characters', 'detail', '1']);
    });
  });
});



describe('useInfinitePeople', () => {
  beforeEach(() => {
    setupMocks();
  });

  describe('given successful API response', () => {
    it('should return infinite people data', async () => {
      const { renderHookWithProvider } = createReactQueryTestSetup();
      mockCharacterApi.getPeople.mockResolvedValue(mockPeopleResponse);

      const { result } = renderHookWithProvider(() => useInfinitePeople('luke'));

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data?.pages).toEqual([mockPeopleResponse]);
      expect(mockCharacterApi.getPeople).toHaveBeenCalledWith({ page: 1, search: 'luke' });
    });
  });

  describe('given no search term', () => {
    it('should call API without search', async () => {
      const { renderHookWithProvider } = createReactQueryTestSetup();
      mockCharacterApi.getPeople.mockResolvedValue(mockPeopleResponse);

      const { result } = renderHookWithProvider(() => useInfinitePeople());

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockCharacterApi.getPeople).toHaveBeenCalledWith({ page: 1, search: undefined });
    });
  });

  describe('given pagination', () => {
    it('should handle next page correctly', async () => {
      const { renderHookWithProvider } = createReactQueryTestSetup();
      const firstPage = { ...mockPeopleResponse, next: 'page2' };
      const secondPage = { ...mockPeopleResponse, next: null };
      
      mockCharacterApi.getPeople
        .mockResolvedValueOnce(firstPage)
        .mockResolvedValueOnce(secondPage);

      const { result } = renderHookWithProvider(() => useInfinitePeople());

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.hasNextPage).toBe(true);

      await result.current.fetchNextPage();

      await waitFor(() => {
        expect(result.current.data?.pages).toHaveLength(2);
      });

      expect(result.current.hasNextPage).toBe(false);
    });
  });
});

describe('usePerson', () => {
  beforeEach(() => {
    setupMocks();
  });

  describe('given valid ID', () => {
    it('should return person data', async () => {
      const { renderHookWithProvider } = createReactQueryTestSetup();
      mockCharacterApi.getPerson.mockResolvedValue(mockPerson);

      const { result } = renderHookWithProvider(() => usePerson('1'));

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockPerson);
      expect(mockCharacterApi.getPerson).toHaveBeenCalledWith('1');
    });
  });

  describe('given empty ID', () => {
    it('should not execute query', () => {
      const { renderHookWithProvider } = createReactQueryTestSetup();

      const { result } = renderHookWithProvider(() => usePerson(''));

      expect(result.current.isSuccess).toBe(false);
      expect(mockCharacterApi.getPerson).not.toHaveBeenCalled();
    });
  });

  describe('given API error', () => {
    it('should return error state', async () => {
      const { renderHookWithProvider } = createReactQueryTestSetup();
      const apiError = new Error('Person not found');
      mockCharacterApi.getPerson.mockRejectedValue(apiError);

      const { result } = renderHookWithProvider(() => usePerson('999'));

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error?.message).toBe('Person not found');
    });
  });
});
