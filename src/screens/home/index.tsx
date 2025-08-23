import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  SearchHeader, 
  CharactersList, 
  LoadingState, 
  ErrorState 
} from './components';
import { useCharactersList, useCharacterNavigation } from './hooks';

export const HomeScreen: React.FC = () => {
  const {
    searchQuery,
    allCharacters,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
    handleSearchChange,
    handleEndReached,
    refetch,
  } = useCharactersList();

  const { handleCharacterPress } = useCharacterNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <SearchHeader 
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
      {isLoading && <LoadingState />}
      {isError && <ErrorState error={error} onRetry={refetch} />}
      {!isLoading && !isError && (
        <CharactersList
          characters={allCharacters}
          onCharacterPress={handleCharacterPress}
          onEndReached={handleEndReached}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
