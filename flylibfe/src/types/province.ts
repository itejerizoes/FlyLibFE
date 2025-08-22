import { Visited } from "./visited";


export interface Province {
  provinceId: number;
  name: string;
  countryId: number;
  visiteds: Visited[];
}

export interface ProvinceCreate {
  name: string;
  countryId: number;
}

export interface ProvinceUpdate {
  provinceId: number;
  name: string;
  countryId: number;
}