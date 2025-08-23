import { create } from 'zustand';
import { Person } from '../model/types';
import { ValidatedCharacter } from '../model/schema';

interface CharactersStore {
  editedCharacters: Record<string, ValidatedCharacter>;
  updateCharacter: (character: ValidatedCharacter) => void;
  getCharacter: (url: string, originalCharacter?: Person) => Person | ValidatedCharacter;
  resetCharacter: (url: string) => void;
  hasChanges: (url: string) => boolean;
  clearAll: () => void;
}

export const useCharactersStore = create<CharactersStore>((set, get) => ({
  editedCharacters: {},
  
  updateCharacter: (character) => {
    set((state) => ({
      editedCharacters: {
        ...state.editedCharacters,
        [character.url]: character,
      },
    }));
  },
  
  getCharacter: (url, originalCharacter) => {
    const { editedCharacters } = get();
    const editedCharacter = editedCharacters[url];
    
    if (!editedCharacter) {
      return originalCharacter as Person;
    }
    
    return {
      ...originalCharacter,
      ...editedCharacter,
    } as Person;
  },
  
  resetCharacter: (url) => {
    set((state) => {
      const newEditedCharacters = { ...state.editedCharacters };
      delete newEditedCharacters[url];
      
      return {
        editedCharacters: newEditedCharacters,
      };
    });
  },
  
  hasChanges: (url) => {
    const { editedCharacters } = get();
    return !!editedCharacters[url];
  },
  
  clearAll: () => {
    set({ editedCharacters: {} });
  },
}));
