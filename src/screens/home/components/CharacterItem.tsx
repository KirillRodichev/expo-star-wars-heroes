import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Person } from '../../../entities/character/model/types';
import { useTestIDs } from '../../../shared/lib/useTestIDs';

interface CharacterItemProps {
  character: Person;
  onPress: (character: Person) => void;
  testID?: string;
}

export const CharacterItem: React.FC<CharacterItemProps> = ({ character, onPress, testID }) => {
  const itemTestID = testID || 'character-item';
  const testIDs = useTestIDs(itemTestID, ['name', 'details', 'arrow']);
  
  return (
    <TouchableOpacity
      style={styles.characterItem}
      onPress={() => onPress(character)}
      accessibilityRole="button"
      accessibilityLabel={`Character ${character.name}`}
      activeOpacity={0.7}
      testID={testIDs.root}
    >
      <View style={styles.characterInfo}>
        <Text style={styles.characterName} testID={testIDs.name}>{character.name}</Text>
        <Text style={styles.characterDetails} testID={testIDs.details}>
          {character.birth_year} • {character.gender}
        </Text>
      </View>
      <View style={styles.characterArrow}>
        <Text style={styles.arrowText} testID={testIDs.arrow}>›</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  characterItem: {
    backgroundColor: 'white',
    padding: 18,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 3,
    borderLeftColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  characterName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  characterDetails: {
    fontSize: 14,
    color: '#666',
  },
  characterInfo: {
    flex: 1,
  },
  characterArrow: {
    alignItems: 'center',
    width: 24,
    height: 24,
  },
  arrowText: {
    fontSize: 24,
    lineHeight: 20,
    color: '#007AFF',
    fontWeight: '600',
  },
});
