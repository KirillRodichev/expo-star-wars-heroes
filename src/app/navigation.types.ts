import { Person } from '../entities/character/model/types';

export type RootStackParamList = {
  Home: undefined;
  CharacterDetail: {
    characterId: string;
    character: Person;
  };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
