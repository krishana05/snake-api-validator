import React, { useState } from 'react';
import './ValidateGame.styles.css'
import { ValidateGameProps } from '../config/types';
import { validateNewGame } from '../../api/SnakeGame';

function ValidateGame({ setValidatedState }: ValidateGameProps) {
  const [validateData, setValidateData] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);

  const validatePayload = (input: any) => {
    try {
      const payload = JSON.parse(input);
      return payload;
    } catch {
      setIsDisabled(true);
      alert('Please enter the data in json format');
      return {};
    }
  }

  const stateChangeHandler = (event: any) => {
    console.log(event.target.value);
    const input = event.target.value;
    if(input){
      setTimeout(()=> {
        const payload = validatePayload(input);
        setValidateData(payload);
        setIsDisabled(false);
      }, 1000); // Adding some delay to validate, here debounce can be also used
    }
  }
  const validateState = async () => {
    if(typeof validateData === 'object') {
      try {
        const data = await validateNewGame(validateData);
        console.log({ validatedGameState: data });
        setValidatedState(data);
      } catch {
        setValidatedState({});
        alert('Something went wrong !!');
      }
    } else {
      alert('Please enter the data in json format');
    }
  };
  return (
    <div>
      <h4>Paste your game state here to validate:</h4>
      <div>
        <textarea onPaste={(e)=> stateChangeHandler(e)} onChange={(e)=> stateChangeHandler(e)} id='width' />
      </div>
      <div>
        <button disabled={isDisabled} onClick={validateState}>Validate Game</button>
      </div>
    </div>
  );
}

export default ValidateGame;
