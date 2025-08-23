import { swapiClient, swapiUtils } from '../../../shared/api/swapi-client';
import { Person, PeopleResponse, SearchParams } from '../model/types';

export class CharacterApi {
  async getPeople(params: SearchParams = {}): Promise<PeopleResponse> {
    const queryString = swapiUtils.buildQueryString({
      page: params.page,
      search: params.search,
    });
    
    const endpoint = `/people${queryString}`;
    return swapiClient.get<PeopleResponse>(endpoint);
  }

  async getPerson(id: string): Promise<Person> {
    return swapiClient.get<Person>(`/people/${id}/`);
  }
}

export const characterApi = new CharacterApi();
