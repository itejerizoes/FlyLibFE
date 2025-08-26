import {
  getCountries,
  getCountryById,
  getCountryByName,
  createCountry,
  updateCountry,
  deleteCountry
} from '../../api/countries';
import api from '../../api/axios';

jest.mock('../../api/axios');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('countries API', () => {
  test('getCountries retorna la lista de países', async () => {
    (api.get as jest.Mock).mockResolvedValue({ data: [{ id: 1, name: 'Argentina' }] });
    const result = await getCountries();
    expect(api.get).toHaveBeenCalledWith('/v1/Countries');
    expect(result).toEqual([{ id: 1, name: 'Argentina' }]);
  });

  test('getCountryById retorna el país por id', async () => {
    (api.get as jest.Mock).mockResolvedValue({ data: { id: 2, name: 'Brasil' } });
    const result = await getCountryById(2);
    expect(api.get).toHaveBeenCalledWith('/v1/Countries/2');
    expect(result).toEqual({ id: 2, name: 'Brasil' });
  });

  test('getCountryByName retorna el país por nombre', async () => {
    (api.get as jest.Mock).mockResolvedValue({ data: { id: 3, name: 'Chile' } });
    const result = await getCountryByName('Chile');
    expect(api.get).toHaveBeenCalledWith('/v1/Countries/byName/Chile');
    expect(result).toEqual({ id: 3, name: 'Chile' });
  });

  test('createCountry crea un país y retorna el país creado', async () => {
    const countryData = { name: 'Uruguay', isoCode: 'UY' };
    (api.post as jest.Mock).mockResolvedValue({ data: { id: 4, ...countryData } });
    const result = await createCountry(countryData);
    expect(api.post).toHaveBeenCalledWith('/v1/Countries', countryData);
    expect(result).toEqual({ id: 4, name: 'Uruguay', isoCode: 'UY' });
  });

  test('updateCountry actualiza un país', async () => {
    const countryUpdate = { countryId: 5, name: 'Paraguay', isoCode: 'PY' };
    (api.put as jest.Mock).mockResolvedValue({});
    await updateCountry(5, countryUpdate);
    expect(api.put).toHaveBeenCalledWith('/v1/Countries/5', countryUpdate);
  });

  test('deleteCountry elimina un país', async () => {
    (api.delete as jest.Mock).mockResolvedValue({});
    await deleteCountry(6);
    expect(api.delete).toHaveBeenCalledWith('/v1/Countries/6');
  });
});