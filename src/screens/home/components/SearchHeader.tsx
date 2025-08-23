import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useTestIDs } from '../../../shared/lib/useTestIDs';

interface SearchHeaderProps {
  searchQuery: string;
  onSearchChange: (text: string) => void;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  const testIDs = useTestIDs('search-header', ['title', 'input']);
  
  return (
    <View style={styles.header} testID={testIDs.root}>
      <Text style={styles.title} testID={testIDs.title}>Star Wars Heroes</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search characters..."
          value={searchQuery}
          onChangeText={onSearchChange}
          placeholderTextColor="#666"
          testID={testIDs.input}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  searchContainer: {
    position: 'relative',
  },
  searchInput: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingRight: 50,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
});
