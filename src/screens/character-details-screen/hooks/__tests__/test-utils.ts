import { renderHook } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { useCharacterForm } from '../useCharacterForm';
import { useCharactersStore } from '../../../../entities/character/store/charactersStore';
import { Person } from '../../../../entities/character/model/types';

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

export const mockAlert = Alert as jest.Mocked<typeof Alert>;
export const mockUseCharactersStore = useCharactersStore as jest.MockedFunction<typeof useCharactersStore>;

export const setupMocks = () => {
  jest.clearAllMocks();
  
  mockUseCharactersStore.mockReturnValue({
    getCharacter: jest.fn(),
    updateCharacter: jest.fn(),
    clearAll: jest.fn(),
    hasChanges: jest.fn(),
    resetCharacter: jest.fn(),
  });
};

export const createUseCharacterFormTestSetup = (initialCharacter?: Person) => {
  const mockStore = {
    getCharacter: jest.fn((url: string, fallback: Person) => fallback),
    updateCharacter: jest.fn(),
    clearAll: jest.fn(),
    hasChanges: jest.fn(() => false),
    resetCharacter: jest.fn(),
  };

  mockUseCharactersStore.mockReturnValue(mockStore);

  return {
    renderHook: () => renderHook(() => useCharacterForm({ initialCharacter })),
    mockStore,
  };
};

export const expectSuccessfulSave = () => {
  expect(mockAlert.alert).toHaveBeenCalledWith(
    'Success',
    'Character information saved locally!'
  );
};

export const expectResetConfirmationDialog = () => {
  expect(mockAlert.alert).toHaveBeenCalledWith(
    'Reset Changes',
    'Are you sure you want to reset all local changes for this character?',
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Reset', style: 'destructive', onPress: expect.any(Function) }
    ]
  );
};

export const expectCharacterWasUpdatedInStore = (mockStore: any, character: Person) => {
  expect(mockStore.updateCharacter).toHaveBeenCalledWith(character);
};

export const expectCharacterWasResetInStore = (mockStore: any) => {
  expect(mockStore.resetCharacter).toHaveBeenCalled();
};

export const getResetButton = () => {
  const alertCall = mockAlert.alert.mock.calls.find(call => 
    call[0] === 'Reset Changes'
  );
  
  if (!alertCall) {
    throw new Error('Reset confirmation dialog not found');
  }
  
  const buttons = alertCall[2] as any[];
  return buttons.find(button => button.text === 'Reset');
};
