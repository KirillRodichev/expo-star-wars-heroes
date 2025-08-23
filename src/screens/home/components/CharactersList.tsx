import React, { useCallback } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Person } from '../../../entities/character/model/types';
import { CharacterItem } from './CharacterItem';

interface CharactersListProps {
  characters: Person[];
  onCharacterPress: (character: Person) => void;
  onEndReached: () => void;
  isFetchingNextPage: boolean;
}

export const CharactersList: React.FC<CharactersListProps> = ({
  characters,
  onCharacterPress,
  onEndReached,
  isFetchingNextPage,
}) => {
  const renderCharacterItem = useCallback(({ item }: { item: Person }) => {
    return (
      <CharacterItem
        character={item}
        onPress={onCharacterPress}
      />
    );
  }, [onCharacterPress]);

  const renderFooter = useCallback(() => {
    if (!isFetchingNextPage) return null;
    
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#0066cc" />
      </View>
    );
  }, [isFetchingNextPage]);

  return (
    <FlashList
      data={characters}
      renderItem={renderCharacterItem}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => `${item.url}-${index}`}
    />
  );
};

const styles = StyleSheet.create({
  footerLoader: {
    padding: 20,
    alignItems: 'center',
  },
});
