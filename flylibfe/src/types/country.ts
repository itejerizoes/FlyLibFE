import { Province } from "./province";

export interface Country {
  countryId: number;
  name: string;
  isoCode: string;
  provinces: Province[];
}

export interface CountryCreate {
  name: string;
  isoCode: string;
}

export interface CountryUpdate {
  countryId: number;
  name: string;
  isoCode: string;
}