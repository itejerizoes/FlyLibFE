import {
  getPhotos,
  getPhotoById,
  createPhoto,
  updatePhoto,
  deletePhoto
} from '../../api/photos';
import api from '../../api/axios';

jest.mock('../../api/axios');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('photos API', () => {
  test('getPhotos retorna la lista de fotos', async () => {
    (api.get as jest.Mock).mockResolvedValue({ data: [{ id: 1, url: 'test.jpg' }] });
    const result = await getPhotos();
    expect(api.get).toHaveBeenCalledWith('/v1/Photos');
    expect(result).toEqual([{ id: 1, url: 'test.jpg' }]);
  });

  test('getPhotoById retorna la foto por id', async () => {
    (api.get as jest.Mock).mockResolvedValue({ data: { id: 2, url: 'photo2.jpg' } });
    const result = await getPhotoById(2);
    expect(api.get).toHaveBeenCalledWith('/v1/Photos/2');
    expect(result).toEqual({ id: 2, url: 'photo2.jpg' });
  });

  test('createPhoto crea una foto y retorna la foto creada', async () => {
    const photoData = { url: 'new.jpg', description: 'desc', provinceId: 1, userId: 'abc', visitedId: 10 };
    (api.post as jest.Mock).mockResolvedValue({ data: { id: 3, ...photoData } });
    const result = await createPhoto(photoData);
    expect(api.post).toHaveBeenCalledWith('/v1/Photos', photoData);
    expect(result).toEqual({ id: 3, ...photoData });
  });

  test('updatePhoto actualiza una foto', async () => {
    const photoUpdate = { photoId: 4, url: 'updated.jpg', description: 'desc', provinceId: 1, userId: 'abc', visitedId: 10 };
    (api.put as jest.Mock).mockResolvedValue({});
    await updatePhoto(4, photoUpdate);
    expect(api.put).toHaveBeenCalledWith('/v1/Photos/4', photoUpdate);
  });

  test('deletePhoto elimina una foto', async () => {
    (api.delete as jest.Mock).mockResolvedValue({});
    await deletePhoto(5);
    expect(api.delete).toHaveBeenCalledWith('/v1/Photos/5');
  });
});