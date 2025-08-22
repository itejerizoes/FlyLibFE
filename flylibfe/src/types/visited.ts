import { Photo } from "./photo";

export interface Visited {
  id: number;
  userId: string;
  provinceId: number;
  photos: Photo[];
}

export interface VisitedCreate {
  userId: string;
  provinceId: number;
  photos: any[]; // Ajusta el tipo según CreatePhotoRequestV1
}

export interface VisitedUpdate {
  id: number;
  userId: string;
  provinceId: number;
  photos: any[]; // Ajusta el tipo según UpdatePhotoRequestV1
}