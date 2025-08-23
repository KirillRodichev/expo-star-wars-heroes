import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ValidatedCharacter } from '../../../entities/character/model/schema';
import { ReadOnlyField } from './ReadOnlyField';

interface ReadOnlySectionProps {
  character: ValidatedCharacter;
}

export const ReadOnlySection: React.FC<ReadOnlySectionProps> = ({ character }) => {
  return (
    <View style={styles.readOnlySection}>
      <Text style={styles.sectionTitle}>Read-Only Information</Text>
      
      <ReadOnlyField
        label="Films"
        value={`${character.films?.length || 0} film(s)`}
      />
      
      <ReadOnlyField
        label="Starships"
        value={`${character.starships?.length || 0} starship(s)`}
      />
      
      <ReadOnlyField
        label="Vehicles"
        value={`${character.vehicles?.length || 0} vehicle(s)`}
      />
      
      <ReadOnlyField
        label="Species"
        value={`${character.species?.length || 0} species`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  readOnlySection: {
    marginTop: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
});
