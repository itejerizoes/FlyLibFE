export interface Photo {
  id: number;
  url: string;
  description?: string;
  visitedId: number;
}

export interface PhotoCreate {
  url: string;
  description?: string;
  visitedId: number;
}

export interface PhotoUpdate {
  photoId: number;
  url: string;
  description?: string;
  visitedId: number;
}