import { Visited } from "./visited";

export interface User {
  id: string;
  displayName: string;
  authProvider: string;
  visiteds: Visited[];
}

export interface UserCreate {
  displayName: string;
  authProvider: string;
}

export interface UserUpdate {
  id: string;
  displayName: string;
  authProvider: string;
}