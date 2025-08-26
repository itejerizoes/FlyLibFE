import {
  getVisiteds,
  getVisitedById,
  createVisited,
  updateVisited,
  deleteVisited
} from '../../api/visiteds';
import api from '../../api/axios';

jest.mock('../../api/axios');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('visiteds API', () => {
  test('getVisiteds retorna la lista de provincias visitadas', async () => {
    (api.get as jest.Mock).mockResolvedValue({ data: [{ id: 1, provinceId: 2, userId: 'abc' }] });
    const result = await getVisiteds();
    expect(api.get).toHaveBeenCalledWith('/v1/Visiteds');
    expect(result).toEqual([{ id: 1, provinceId: 2, userId: 'abc' }]);
  });

  test('getVisitedById retorna una provincia visitada por id', async () => {
    (api.get as jest.Mock).mockResolvedValue({ data: { id: 2, provinceId: 3, userId: 'def' } });
    const result = await getVisitedById(2);
    expect(api.get).toHaveBeenCalledWith('/v1/Visiteds/2');
    expect(result).toEqual({ id: 2, provinceId: 3, userId: 'def' });
  });

  test('createVisited crea una provincia visitada y retorna el registro creado', async () => {
    const visitedData = { provinceId: 4, userId: 'xyz', visitedDate: '2025-08-25', photos: [] };
    (api.post as jest.Mock).mockResolvedValue({ data: { id: 3, ...visitedData } });
    const result = await createVisited(visitedData);
    expect(api.post).toHaveBeenCalledWith('/v1/Visiteds', visitedData);
    expect(result).toEqual({ id: 3, ...visitedData });
  });

  test('updateVisited actualiza una provincia visitada', async () => {
    const visitedUpdate = { id: 4, provinceId: 5, userId: 'uvw', visitedDate: '2025-08-26', photos: [] };
    (api.put as jest.Mock).mockResolvedValue({});
    await updateVisited(4, visitedUpdate);
    expect(api.put).toHaveBeenCalledWith('/v1/Visiteds/4', visitedUpdate);
  });

  test('deleteVisited elimina una provincia visitada', async () => {
    (api.delete as jest.Mock).mockResolvedValue({});
    await deleteVisited(5);
    expect(api.delete).toHaveBeenCalledWith('/v1/Visiteds/5');
  });
});