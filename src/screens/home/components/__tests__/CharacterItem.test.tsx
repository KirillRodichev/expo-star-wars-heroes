import React from 'react';
import { fireEvent, screen } from '@testing-library/react-native';
import { CharacterItem } from '../CharacterItem';
import { 
  renderWithProviders, 
  createMockFunction,
  expectElementToBeVisible,
  expectFunctionToHaveBeenCalledWith,
  expectFunctionToHaveBeenCalledTimes
} from '../../../../test/ui-utils';

const mockCharacter = {
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

const createCharacterItemTestSetup = (props = {}) => {
  const defaultProps = {
    character: mockCharacter,
    onPress: createMockFunction(),
    testID: 'test-character-item',
    ...props,
  };

  const renderResult = renderWithProviders(<CharacterItem {...defaultProps} />);
  
  return {
    ...renderResult,
    props: defaultProps,
  };
};

describe('CharacterItem', () => {
  describe('rendering behavior', () => {
    describe('given character data', () => {
      it('should render character name', () => {
        createCharacterItemTestSetup();

        expectElementToBeVisible(screen.getByTestId('test-character-item-name'));
      });

      it('should render character details', () => {
        createCharacterItemTestSetup();

        expectElementToBeVisible(screen.getByTestId('test-character-item-details'));
      });

      it('should render arrow indicator', () => {
        createCharacterItemTestSetup();

        expectElementToBeVisible(screen.getByTestId('test-character-item-arrow'));
      });
    });

    describe('given different character data', () => {
      it('should render different character information', () => {
        const differentCharacter = {
          ...mockCharacter,
          name: 'Darth Vader',
          birth_year: '41.9BBY',
          gender: 'male',
        };

        createCharacterItemTestSetup({ character: differentCharacter });

        expectElementToBeVisible(screen.getByTestId('test-character-item-name'));
        expectElementToBeVisible(screen.getByTestId('test-character-item-details'));
      });
    });
  });

  describe('user interaction behavior', () => {
    describe('when user taps character item', () => {
      it('should call onPress with character data', () => {
        const { props } = createCharacterItemTestSetup();

        const characterItem = screen.getByTestId('test-character-item');
        fireEvent.press(characterItem);

        expectFunctionToHaveBeenCalledWith(props.onPress, mockCharacter);
      });

      it('should call onPress only once per tap', () => {
        const { props } = createCharacterItemTestSetup();

        const characterItem = screen.getByTestId('test-character-item');
        fireEvent.press(characterItem);

        expectFunctionToHaveBeenCalledTimes(props.onPress, 1);
      });
    });

    describe('when user taps multiple times', () => {
      it('should call onPress for each tap', () => {
        const { props } = createCharacterItemTestSetup();

        const characterItem = screen.getByTestId('test-character-item');
        fireEvent.press(characterItem);
        fireEvent.press(characterItem);
        fireEvent.press(characterItem);

        expectFunctionToHaveBeenCalledTimes(props.onPress, 3);
      });
    });
  });

  describe('accessibility behavior', () => {
    it('should have proper accessibility role', () => {
      createCharacterItemTestSetup();

      const characterItem = screen.getByTestId('test-character-item');
      expectElementToBeVisible(characterItem);
    });

    it('should have descriptive accessibility label', () => {
      createCharacterItemTestSetup();

      const characterItem = screen.getByTestId('test-character-item');
      expectElementToBeVisible(characterItem);
    });

    it('should have proper accessibility label for different character', () => {
      const differentCharacter = {
        ...mockCharacter,
        name: 'Darth Vader',
      };

      createCharacterItemTestSetup({ character: differentCharacter });

      const characterItem = screen.getByTestId('test-character-item');
      expectElementToBeVisible(characterItem);
    });
  });

  describe('edge cases', () => {
    it('should handle character with missing birth year', () => {
      const characterWithoutBirthYear = {
        ...mockCharacter,
        birth_year: 'unknown',
      };

      createCharacterItemTestSetup({ character: characterWithoutBirthYear });

      expectElementToBeVisible(screen.getByTestId('test-character-item-details'));
    });

    it('should handle character with missing gender', () => {
      const characterWithoutGender = {
        ...mockCharacter,
        gender: 'n/a',
      };

      createCharacterItemTestSetup({ character: characterWithoutGender });

      expectElementToBeVisible(screen.getByTestId('test-character-item-details'));
    });
  });

  describe('multiple items behavior', () => {
    it('should handle multiple character items with different testIDs', () => {
      const mockCharacter2 = {
        ...mockCharacter,
        name: 'Darth Vader',
        url: 'https://swapi.py4e.com/api/people/4/',
      };

      renderWithProviders(
        <>
          <CharacterItem character={mockCharacter} onPress={jest.fn()} testID="luke-item" />
          <CharacterItem character={mockCharacter2} onPress={jest.fn()} testID="vader-item" />
        </>
      );

      expectElementToBeVisible(screen.getByTestId('luke-item-name'));
      expectElementToBeVisible(screen.getByTestId('luke-item-details'));
      expectElementToBeVisible(screen.getByTestId('vader-item-name'));
      expectElementToBeVisible(screen.getByTestId('vader-item-details'));
    });

    it('should use default testID when not provided', () => {
      renderWithProviders(
        <>
          <CharacterItem character={mockCharacter} onPress={jest.fn()} />
          <CharacterItem character={mockCharacter} onPress={jest.fn()} />
        </>
      );

      const names = screen.getAllByTestId('character-item-name');
      const details = screen.getAllByTestId('character-item-details');
      
      expect(names).toHaveLength(2);
      expect(details).toHaveLength(2);
      expectElementToBeVisible(names[0]);
      expectElementToBeVisible(names[1]);
      expectElementToBeVisible(details[0]);
      expectElementToBeVisible(details[1]);
    });
  });
});
