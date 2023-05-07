import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { errorHandler, getDefaultSnake, getFruitPosition, validateQueryParams } from "./utility";
import { HTTPS_METHODS, HTTPS_STATUS, STATE } from "./types";

export const newGameHandler = (req: Request, res: Response) => {
  errorHandler(req, res, HTTPS_METHODS.GET);
  const queryParams: any = req.query;
  // console.log('queryParams', queryParams);
  const width = validateQueryParams('w', 'width', queryParams);
  const height = validateQueryParams('h', 'height', queryParams);
  console.log({width, height});
  if(width && height){
    const gameState : STATE = {
      GameID: uuidv4(),
      Width:  width,
      Height: height,
      Score: 0,
      Fruit:  getFruitPosition(width, height),
      Snake:  getDefaultSnake(),
    }
    res.status(HTTPS_STATUS.OK).json({ data: gameState });
  } else res.status(HTTPS_STATUS.BAD_REQUEST).json({ error: 'The params are not valid'});
}