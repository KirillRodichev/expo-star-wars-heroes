import { Person, PeopleResponse } from '../entities/character/model/types';

export const mockPerson: Person = {
  name: 'Luke Skywalker',
  birth_year: '19BBY',
  eye_color: 'blue',
  gender: 'male',
  hair_color: 'blond',
  height: '172',
  mass: '77',
  skin_color: 'fair',
  homeworld: 'https://swapi.py4e.com/api/planets/1/',
  films: [
    'https://swapi.py4e.com/api/films/1/',
    'https://swapi.py4e.com/api/films/2/',
  ],
  species: ['https://swapi.py4e.com/api/species/1/'],
  starships: ['https://swapi.py4e.com/api/starships/12/'],
  vehicles: ['https://swapi.py4e.com/api/vehicles/14/'],
  url: 'https://swapi.py4e.com/api/people/1/',
  created: '2014-12-09T13:50:51.644000Z',
  edited: '2014-12-10T13:52:43.172000Z',
};

export const mockPerson2: Person = {
  name: 'Darth Vader',
  birth_year: '41.9BBY',
  eye_color: 'yellow',
  gender: 'male',
  hair_color: 'none',
  height: '202',
  mass: '136',
  skin_color: 'white',
  homeworld: 'https://swapi.py4e.com/api/planets/1/',
  films: [
    'https://swapi.py4e.com/api/films/1/',
    'https://swapi.py4e.com/api/films/2/',
  ],
  species: ['https://swapi.py4e.com/api/species/1/'],
  starships: ['https://swapi.py4e.com/api/starships/13/'],
  vehicles: [],
  url: 'https://swapi.py4e.com/api/people/4/',
  created: '2014-12-10T15:18:20.704000Z',
  edited: '2014-12-20T21:17:50.313000Z',
};

export const mockPeopleResponse: PeopleResponse = {
  count: 82,
  next: 'https://swapi.py4e.com/api/people/?page=2',
  previous: null,
  results: [mockPerson, mockPerson2],
};

export const createMockFetch = (response: any, ok = true) => {
  return jest.fn().mockResolvedValue({
    ok,
    json: jest.fn().mockResolvedValue(response),
  });
};
