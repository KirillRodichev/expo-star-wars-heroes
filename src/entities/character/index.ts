export type { 
  Person, 
  PeopleResponse, 
  SearchParams,
  ApiError 
} from './model';

export { 
  useInfinitePeople, 
  usePerson,
  characterQueryKeys,
  characterApi 
} from './api';

export { useCharactersStore } from './store/charactersStore';

export type { CharacterFormData, ValidatedCharacter } from './model/schema';
export { 
  characterFormSchema, 
  characterEditSchema 
} from './model/schema';

export { swapiUtils } from '../../shared/api/swapi-client';
