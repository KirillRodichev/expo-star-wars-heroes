import { act, renderHook } from '@testing-library/react-native';
import { useCharactersStore } from '../charactersStore';
import { mockPerson, mockPerson2 } from '../../../../test/mocks';

describe('charactersStore', () => {
  beforeEach(() => {
    act(() => {
      useCharactersStore.getState().clearAll();
    });
  });

  describe('initialization', () => {
    it('should initialize with empty edited characters', () => {
      const { result } = renderHook(() => useCharactersStore());
      
      expect(result.current.editedCharacters).toEqual({});
    });
  });

  describe('updateCharacter', () => {
    it('should update character', () => {
      const { result } = renderHook(() => useCharactersStore());
      const editedCharacter = { ...mockPerson, name: 'Updated Luke' };

      act(() => {
        result.current.updateCharacter(editedCharacter);
      });

      expect(result.current.editedCharacters[mockPerson.url]).toEqual(editedCharacter);
    });

    it('should overwrite previous edits for same character', () => {
      const { result } = renderHook(() => useCharactersStore());
      const firstEdit = { ...mockPerson, name: 'First Edit' };
      const secondEdit = { ...mockPerson, name: 'Second Edit' };

      act(() => {
        result.current.updateCharacter(firstEdit);
      });
      expect(result.current.editedCharacters[mockPerson.url].name).toBe('First Edit');

      act(() => {
        result.current.updateCharacter(secondEdit);
      });
      expect(result.current.editedCharacters[mockPerson.url].name).toBe('Second Edit');
    });
  });

  describe('getCharacter', () => {
    it('should return original character when no edits exist', () => {
      const { result } = renderHook(() => useCharactersStore());

      const character = result.current.getCharacter(mockPerson.url, mockPerson);
      
      expect(character).toEqual(mockPerson);
    });

    it('should return merged character when edits exist', () => {
      const { result } = renderHook(() => useCharactersStore());
      const editedData = { 
        url: mockPerson.url, 
        name: 'Updated Luke',
        birth_year: mockPerson.birth_year,
        height: mockPerson.height,
        mass: mockPerson.mass,
        hair_color: mockPerson.hair_color,
        skin_color: mockPerson.skin_color,
        eye_color: mockPerson.eye_color,
        gender: mockPerson.gender,
        homeworld: mockPerson.homeworld,
        films: mockPerson.films,
        species: mockPerson.species,
        starships: mockPerson.starships,
        vehicles: mockPerson.vehicles,
        created: mockPerson.created,
        edited: mockPerson.edited,
      };

      act(() => {
        result.current.updateCharacter(editedData);
      });

      const character = result.current.getCharacter(mockPerson.url, mockPerson);
      
      expect(character.name).toBe('Updated Luke');
      expect(character.birth_year).toBe(mockPerson.birth_year);
      expect(character.url).toBe(mockPerson.url);
    });

    it('should return original character when no originalCharacter provided and no edits', () => {
      const { result } = renderHook(() => useCharactersStore());

      const character = result.current.getCharacter(mockPerson.url);
      
      expect(character).toBeUndefined();
    });

    it('should handle non-existent character URL', () => {
      const { result } = renderHook(() => useCharactersStore());
      const nonExistentUrl = 'https://swapi.py4e.com/api/people/999/';

      const character = result.current.getCharacter(nonExistentUrl, mockPerson);
      
      expect(character).toEqual(mockPerson);
    });
  });

  describe('resetCharacter', () => {
    it('should reset character edits', () => {
      const { result } = renderHook(() => useCharactersStore());
      const editedCharacter = { ...mockPerson, name: 'Updated Luke' };

      act(() => {
        result.current.updateCharacter(editedCharacter);
      });

      expect(result.current.hasChanges(mockPerson.url)).toBe(true);

      act(() => {
        result.current.resetCharacter(mockPerson.url);
      });

      expect(result.current.hasChanges(mockPerson.url)).toBe(false);
      expect(result.current.editedCharacters[mockPerson.url]).toBeUndefined();
    });

    it('should not affect other characters when resetting', () => {
      const { result } = renderHook(() => useCharactersStore());
      const editedPerson1 = { ...mockPerson, name: 'Updated Luke' };
      const editedPerson2 = { ...mockPerson2, name: 'Updated Vader' };

      act(() => {
        result.current.updateCharacter(editedPerson1);
        result.current.updateCharacter(editedPerson2);
      });

      act(() => {
        result.current.resetCharacter(mockPerson.url);
      });

      expect(result.current.hasChanges(mockPerson.url)).toBe(false);
      expect(result.current.hasChanges(mockPerson2.url)).toBe(true);
      expect(result.current.editedCharacters[mockPerson2.url]).toEqual(editedPerson2);
    });

    it('should handle resetting non-existent character', () => {
      const { result } = renderHook(() => useCharactersStore());
      const nonExistentUrl = 'https://swapi.py4e.com/api/people/999/';

      expect(() => {
        act(() => {
          result.current.resetCharacter(nonExistentUrl);
        });
      }).not.toThrow();

      expect(result.current.hasChanges(nonExistentUrl)).toBe(false);
    });
  });

  describe('hasChanges', () => {
    it('should return false when no changes exist', () => {
      const { result } = renderHook(() => useCharactersStore());

      expect(result.current.hasChanges(mockPerson.url)).toBe(false);
    });

    it('should return true when changes exist', () => {
      const { result } = renderHook(() => useCharactersStore());

      act(() => {
        result.current.updateCharacter({ 
          url: mockPerson.url, 
          name: 'Updated',
          birth_year: mockPerson.birth_year,
          height: mockPerson.height,
          mass: mockPerson.mass,
          hair_color: mockPerson.hair_color,
          skin_color: mockPerson.skin_color,
          eye_color: mockPerson.eye_color,
          gender: mockPerson.gender,
          homeworld: mockPerson.homeworld,
          films: mockPerson.films,
          species: mockPerson.species,
          starships: mockPerson.starships,
          vehicles: mockPerson.vehicles,
          created: mockPerson.created,
          edited: mockPerson.edited,
        });
      });

      expect(result.current.hasChanges(mockPerson.url)).toBe(true);
    });

    it('should handle non-existent character URL', () => {
      const { result } = renderHook(() => useCharactersStore());
      const nonExistentUrl = 'https://swapi.py4e.com/api/people/999/';

      expect(result.current.hasChanges(nonExistentUrl)).toBe(false);
    });
  });

  describe('clearAll', () => {
    it('should clear all edited characters', () => {
      const { result } = renderHook(() => useCharactersStore());
      const editedPerson1 = { ...mockPerson, name: 'Updated Luke' };
      const editedPerson2 = { ...mockPerson2, name: 'Updated Vader' };

      act(() => {
        result.current.updateCharacter(editedPerson1);
        result.current.updateCharacter(editedPerson2);
      });

      expect(result.current.hasChanges(mockPerson.url)).toBe(true);
      expect(result.current.hasChanges(mockPerson2.url)).toBe(true);

      act(() => {
        result.current.clearAll();
      });

      expect(result.current.editedCharacters).toEqual({});
      expect(result.current.hasChanges(mockPerson.url)).toBe(false);
      expect(result.current.hasChanges(mockPerson2.url)).toBe(false);
    });

    it('should work when no characters are edited', () => {
      const { result } = renderHook(() => useCharactersStore());

      expect(() => {
        act(() => {
          result.current.clearAll();
        });
      }).not.toThrow();

      expect(result.current.editedCharacters).toEqual({});
    });
  });

  describe('integration scenarios', () => {
    it('should handle update → reset → update sequence', () => {
      const { result } = renderHook(() => useCharactersStore());
      const firstEdit = { ...mockPerson, name: 'First Edit' };
      const secondEdit = { ...mockPerson, name: 'Second Edit' };

      act(() => {
        result.current.updateCharacter(firstEdit);
      });
      expect(result.current.hasChanges(mockPerson.url)).toBe(true);

      act(() => {
        result.current.resetCharacter(mockPerson.url);
      });
      expect(result.current.hasChanges(mockPerson.url)).toBe(false);

      act(() => {
        result.current.updateCharacter(secondEdit);
      });
      expect(result.current.hasChanges(mockPerson.url)).toBe(true);
      expect(result.current.editedCharacters[mockPerson.url].name).toBe('Second Edit');
    });

    it('should maintain referential integrity', () => {
      const { result } = renderHook(() => useCharactersStore());
      const editedCharacter = { ...mockPerson, name: 'Updated Luke' };

      act(() => {
        result.current.updateCharacter(editedCharacter);
      });

      const character1 = result.current.getCharacter(mockPerson.url, mockPerson);
      const character2 = result.current.getCharacter(mockPerson.url, mockPerson);

      expect(character1).toEqual(character2);
      expect(character1).not.toBe(editedCharacter);
    });
  });
});