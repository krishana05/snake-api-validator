import React, { ChangeEvent, useState } from 'react';
import './NewGame.styles.css'
import { startNewGame } from '../../api/SnakeGame';
import { NewGameProps } from '../config/types';

function NewGame({ setGameState }: NewGameProps) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const updateWidth = (event: ChangeEvent<HTMLInputElement>) => {
    setWidth(parseInt(event.target.value));
  }
  const updateHeight = (event: ChangeEvent<HTMLInputElement>) => {
    setHeight(parseInt(event.target.value));
  }

  const startGame = async () => {
    if(width && height){
      try {
        const data = await startNewGame(width, height);
        console.log({ gameState: data});
        setGameState(data);
      } catch {
        alert('Something went wrong !!');
      }
    } else {
      alert('Please enter valid number in both the fields');
    }
  };

  return (
    <div>
      <div className='NewGame-label'>
        <label>Board Width:</label>
        <input id='width' onChange={(e)=>updateWidth(e)} type='number' />
      </div>
      <div>
        <label>Board Height:</label>
        <input id='height' onChange={(e)=>updateHeight(e)} type='number' />
      </div>
      <div>
        <button onClick={startGame}>Start Game</button>
      </div>
    </div>
  );
}

export default NewGame;
