export enum HTTPS_METHODS {
  GET = 'GET',
  POST = 'POST',
}
  
export enum HTTPS_STATUS {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 400,
  METHOD_NOT_ALOWED = 405,
  TEA_POT = 418,
  INTERNAL_SERVER_ERROR = 500,
}

export type QueryParams = {
  w: string;
  h: string;
}

export interface FRUIT {
  X: number;
  Y: number;
}

interface Ticks {
  VelX: number;
  VelY: number;
}

export type SNAKE = FRUIT & Ticks;

export interface STATE {
  GameID: string;
  Width: number;
  Height: number;
  Score: number;
  Fruit: FRUIT;
  Snake: SNAKE;
}

export interface GAMESTATE extends STATE {
  ticks : Array<Ticks>;
}

export type VALIDATIONS_ERROR = { 
  validationsErrors: Array<string>;
}