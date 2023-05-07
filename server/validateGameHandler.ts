import { Request, Response } from "express";
import { HTTPS_METHODS, HTTPS_STATUS } from "./types";
import { errorHandler, gameStateValidityCheck, updateGameState } from "./utility";

export const validateGameHandler = (req: Request, res: Response) => {
  errorHandler(req, res, HTTPS_METHODS.POST);
  const gameState = req.body; 
  // validate gameState to check for all fields validity
  const validationErrors = gameStateValidityCheck(gameState);
  if (validationErrors.length > 0) {
    res.status(HTTPS_STATUS.BAD_REQUEST).json({ errors: validationErrors });
  } else {
    // check for fruit position and update the score
    const updatedGameState: any = updateGameState(res, gameState);
    if(updatedGameState?.validationsErrors?.length > 0){
      res.status(HTTPS_STATUS.TEA_POT).json({ error: updatedGameState?.validationsErrors });
    } else if (updatedGameState) {
      res.status(HTTPS_STATUS.OK).json({ data: updatedGameState });
    }
     else {
      res.status(HTTPS_STATUS.NOT_FOUND).json({ error: 'Fruit not found' });
    }
  }
}