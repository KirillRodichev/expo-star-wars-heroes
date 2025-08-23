import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../app/navigation.types';
import { Person } from '../../../entities/character/model/types';
import { swapiUtils } from '../../../shared/api';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export const useCharacterNavigation = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleCharacterPress = useCallback((character: Person) => {
    const characterId = swapiUtils.extractIdFromUrl(character.url);
    navigation.navigate('CharacterDetail', { characterId, character });
  }, [navigation]);

  return {
    handleCharacterPress,
  };
};
