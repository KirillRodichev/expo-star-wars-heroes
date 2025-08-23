import { CharacterApi } from '../character-api';
import { swapiClient, swapiUtils } from '../../../../shared/api/swapi-client';
import { mockPeopleResponse, mockPerson } from '../../../../shared/api/__tests__/utils';

jest.mock('../../../../shared/api/swapi-client');

const mockSwapiClient = swapiClient as jest.Mocked<typeof swapiClient>;
const mockSwapiUtils = swapiUtils as jest.Mocked<typeof swapiUtils>;

const createCharacterApiTestSetup = () => {
  const characterApi = new CharacterApi();
  return { characterApi };
};

describe('CharacterApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getPeople', () => {
    describe('given no parameters', () => {
      it('should call swapiClient with correct endpoint', async () => {
        const { characterApi } = createCharacterApiTestSetup();
        mockSwapiClient.get.mockResolvedValue(mockPeopleResponse);
        mockSwapiUtils.buildQueryString.mockReturnValue('');

        const result = await characterApi.getPeople();

        expect(mockSwapiUtils.buildQueryString).toHaveBeenCalledWith({
          page: undefined,
          search: undefined,
        });
        expect(mockSwapiClient.get).toHaveBeenCalledWith('/people');
        expect(result).toEqual(mockPeopleResponse);
      });
    });

    describe('given search parameter', () => {
      it('should build query string with search', async () => {
        const { characterApi } = createCharacterApiTestSetup();
        mockSwapiClient.get.mockResolvedValue(mockPeopleResponse);
        mockSwapiUtils.buildQueryString.mockReturnValue('?search=luke');

        await characterApi.getPeople({ search: 'luke' });

        expect(mockSwapiUtils.buildQueryString).toHaveBeenCalledWith({
          page: undefined,
          search: 'luke',
        });
        expect(mockSwapiClient.get).toHaveBeenCalledWith('/people?search=luke');
      });
    });

    describe('given page parameter', () => {
      it('should build query string with page', async () => {
        const { characterApi } = createCharacterApiTestSetup();
        mockSwapiClient.get.mockResolvedValue(mockPeopleResponse);
        mockSwapiUtils.buildQueryString.mockReturnValue('?page=2');

        await characterApi.getPeople({ page: 2 });

        expect(mockSwapiUtils.buildQueryString).toHaveBeenCalledWith({
          page: 2,
          search: undefined,
        });
        expect(mockSwapiClient.get).toHaveBeenCalledWith('/people?page=2');
      });
    });

    describe('given both search and page parameters', () => {
      it('should build query string with both parameters', async () => {
        const { characterApi } = createCharacterApiTestSetup();
        mockSwapiClient.get.mockResolvedValue(mockPeopleResponse);
        mockSwapiUtils.buildQueryString.mockReturnValue('?search=luke&page=2');

        await characterApi.getPeople({ search: 'luke', page: 2 });

        expect(mockSwapiUtils.buildQueryString).toHaveBeenCalledWith({
          page: 2,
          search: 'luke',
        });
        expect(mockSwapiClient.get).toHaveBeenCalledWith('/people?search=luke&page=2');
      });
    });

    describe('given API error', () => {
      it('should propagate error from swapiClient', async () => {
        const { characterApi } = createCharacterApiTestSetup();
        const apiError = new Error('API Error');
        mockSwapiClient.get.mockRejectedValue(apiError);

        await expect(characterApi.getPeople()).rejects.toThrow('API Error');
      });
    });
  });

  describe('getPerson', () => {
    describe('given valid ID', () => {
      it('should call swapiClient with correct endpoint', async () => {
        const { characterApi } = createCharacterApiTestSetup();
        mockSwapiClient.get.mockResolvedValue(mockPerson);

        const result = await characterApi.getPerson('1');

        expect(mockSwapiClient.get).toHaveBeenCalledWith('/people/1/');
        expect(result).toEqual(mockPerson);
      });
    });

    describe('given different IDs', () => {
      it('should call swapiClient with correct endpoints', async () => {
        const { characterApi } = createCharacterApiTestSetup();
        mockSwapiClient.get.mockResolvedValue(mockPerson);

        await characterApi.getPerson('1');
        await characterApi.getPerson('42');
        await characterApi.getPerson('123');

        expect(mockSwapiClient.get).toHaveBeenCalledWith('/people/1/');
        expect(mockSwapiClient.get).toHaveBeenCalledWith('/people/42/');
        expect(mockSwapiClient.get).toHaveBeenCalledWith('/people/123/');
      });
    });

    describe('given API error', () => {
      it('should propagate error from swapiClient', async () => {
        const { characterApi } = createCharacterApiTestSetup();
        const apiError = new Error('Person not found');
        mockSwapiClient.get.mockRejectedValue(apiError);

        await expect(characterApi.getPerson('999')).rejects.toThrow('Person not found');
      });
    });
  });
});
