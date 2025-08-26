import {
  getProvinces,
  getProvinceById,
  getProvinceByName,
  createProvince,
  updateProvince,
  deleteProvince
} from '../../api/provinces';
import api from '../../api/axios';

jest.mock('../../api/axios');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('provinces API', () => {
  test('getProvinces retorna la lista de provincias', async () => {
    (api.get as jest.Mock).mockResolvedValue({ data: [{ id: 1, name: 'Buenos Aires' }] });
    const result = await getProvinces();
    expect(api.get).toHaveBeenCalledWith('/v1/Provinces');
    expect(result).toEqual([{ id: 1, name: 'Buenos Aires' }]);
  });

  test('getProvinceById retorna la provincia por id', async () => {
    (api.get as jest.Mock).mockResolvedValue({ data: { id: 2, name: 'Córdoba' } });
    const result = await getProvinceById(2);
    expect(api.get).toHaveBeenCalledWith('/v1/Provinces/2');
    expect(result).toEqual({ id: 2, name: 'Córdoba' });
  });

  test('getProvinceByName retorna la provincia por nombre', async () => {
    (api.get as jest.Mock).mockResolvedValue({ data: { id: 3, name: 'Santa Fe' } });
    const result = await getProvinceByName('Santa Fe');
    expect(api.get).toHaveBeenCalledWith('/v1/Provinces/byName/Santa Fe');
    expect(result).toEqual({ id: 3, name: 'Santa Fe' });
  });

  test('createProvince crea una provincia y retorna la provincia creada', async () => {
    const provinceData = { name: 'Mendoza', countryId: 1 };
    (api.post as jest.Mock).mockResolvedValue({ data: { id: 4, ...provinceData } });
    const result = await createProvince(provinceData);
    expect(api.post).toHaveBeenCalledWith('/v1/Provinces', provinceData);
    expect(result).toEqual({ id: 4, ...provinceData });
  });

  test('updateProvince actualiza una provincia', async () => {
    const provinceUpdate = { provinceId: 5, name: 'Salta', countryId: 1 };
    (api.put as jest.Mock).mockResolvedValue({});
    await updateProvince(5, provinceUpdate);
    expect(api.put).toHaveBeenCalledWith('/v1/Provinces/5', provinceUpdate);
  });

  test('deleteProvince elimina una provincia', async () => {
    (api.delete as jest.Mock).mockResolvedValue({});
    await deleteProvince(6);
    expect(api.delete).toHaveBeenCalledWith('/v1/Provinces/6');
  });
});