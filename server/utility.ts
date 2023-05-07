import { Request, Response } from "express";
import { FRUIT, GAMESTATE, HTTPS_STATUS, QueryParams, SNAKE, STATE, VALIDATIONS_ERROR } from "./types";

export const validateQueryParams = (queryKey: keyof QueryParams, queryName: string, queryParams: QueryParams ) => {
	const param = parseInt(queryParams[queryKey]);

  if(param){
    return param;
  } else if(param <= 0){
    console.log(`${queryName} should be greater than 0`);
    return;
  } else if(typeof param !== 'number'){
    console.log(`${queryName} should be a number`);
    return;
  } else {
    console.log(`Invalid or missing ${queryName}`);
  }
}

export const errorHandler = (req: Request, res: Response, acceptedMethod: string) => {
  if(req.method !== acceptedMethod) {
    res.status(HTTPS_STATUS.METHOD_NOT_ALOWED).send({ error: 'This method is not allowed on this url' });
    return;
  }
}

// This default values based on snake start position (0, 0) and velocity of (1, 0) to move right
export const getDefaultSnake  = (): SNAKE => ({
  X: 0,
  Y: 0,
  VelX: 1,
  VelY: 0,
});

// generate a valid integer random number between 0 and max (exclusive)
const generateRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;;

export const getFruitPosition = (width: number, height: number): FRUIT => ({
  X: generateRandomNumber(0, width),
  Y: generateRandomNumber(0, height),
});

export const setDefaultErrorCode = (res: Response) => {
  res.status(HTTPS_STATUS.INTERNAL_SERVER_ERROR).send({ error: 'Something went wrong !! Please try after some time.'});
};

export const gameStateValidityCheck = (gameState: GAMESTATE): Array<string> => {
  const validationArray = [];
  if (!gameState.GameID) {
		validationArray.push("Invalid GameID")
	}
  // check for game board size
	if (gameState.Width <= 0 || gameState.Height <= 0 ) {
		validationArray.push("Invalid game board size");
	}  // check for fruit position
  else if (gameState.Fruit.X < 0 || gameState.Fruit.X >= gameState.Width ||
		gameState.Fruit.Y < 0 || gameState.Fruit.Y >= gameState.Height ||
		(gameState.Fruit.X === gameState.Snake.X && gameState.Fruit.Y === gameState.Snake.Y)) { // position of snake and fruit is same
		validationArray.push("Incorrect Fruit position");
	}

  // check for position of snake
	if (gameState.Snake.X < 0 || gameState.Snake.X >= gameState.Width ||
		gameState.Snake.Y < 0 || gameState.Snake.Y >= gameState.Height) {
		validationArray.push("Incorrect Snake position");
	}
  // check for velocity of snake, should be one of (-1, 0, 1)
	if (gameState.Snake.VelX < -1 || gameState.Snake.VelX > 1 ||
		gameState.Snake.VelY < -1 || gameState.Snake.VelY > 1 ||
		gameState.Snake.VelX === gameState.Snake.VelY) {
		validationArray.push("Incorrect Snake velocity");
	}
	if (gameState.Score < 0) {
		validationArray.push("Invalid Score");
	}
	if (gameState.ticks.length === 0) {
		validationArray.push("Invalid Ticks");
	}
  return validationArray;
};

export const updateGameState = (res: Response, gameState: GAMESTATE): STATE | VALIDATIONS_ERROR => {
  let prevX = gameState.Snake.X;
  let prevY = gameState.Snake.Y;
  let prevVelX: number = -5; // by default assigning some invalid number
  let prevVelY: number = -5; // by default assigning some invalid number
  let isFruitFound = false;
  const validationsErrors: Array<string> = [];

  for(let i = 0; i < gameState.ticks.length; i++ ){
    const tick = gameState.ticks[i];
    // get the current postion
    let curX = prevX + tick.VelX;
    let curY = prevY+tick.VelY;

    if (curX === gameState.Fruit.X && curY === gameState.Fruit.Y) {
			isFruitFound = true
		}
    // check for any invalid move by snake
    if ((tick.VelX !== 0 && prevVelX === tick.VelX) ||
			(tick.VelY !== 0 && prevVelY === tick.VelY) ||
			(tick.VelX === tick.VelY)) {
        validationsErrors.push('Invalid move by Snake');
			  break;
		}
    // check if snake position is out of the game board
    if (curX < 0 || curX >= gameState.Width || curY < 0 || curY >= gameState.Height ) {
      validationsErrors.push('Snake out of board');
      break;
    }
    // now update the previous values with current one
    prevX = curX;
    prevY = curY;
    prevVelX = tick.VelX;
    prevVelY = tick.VelY;
  };

  let updatedFruit = gameState.Fruit;
  if (isFruitFound) {
    updatedFruit = getFruitPosition(gameState.Width, gameState.Height);
    return {
      GameID: gameState.GameID,
      Width:  gameState.Width,
      Height: gameState.Height,
      Score:  gameState.Score + 1,
      Fruit:  updatedFruit,
      Snake:  { X: gameState.Fruit.X, Y: gameState.Fruit.Y, VelX: 0, VelY: 1 },
    }
  }
  return { validationsErrors };
};