import React, { useState } from 'react';
import './App.css';
import NewGame from './components/newGame/NewGame.component';
import ValidateGame from './components/validateGame/ValidateGame.component';

function App() {
  const [active, setActive] = useState('new');
  const [gameState, setGameState] = useState({});
  const buttonHandler = (name: string) => {
    setGameState({});
    if(name === 'new'){
      setActive('new');
    } else setActive('validate');
  };
  return (
    <div className="App">
      <header className="App-header">
        <p>API EndPoint tester for Snake Game Validator</p>
      </header>
      <div className='Button-box'>
        <button onClick={()=> buttonHandler('new')}>New Game</button>
        <button onClick={()=> buttonHandler('validate')}>Validate</button>
      </div>
      { 
        active === 'new' ? <NewGame setGameState={setGameState} /> : <ValidateGame setValidatedState={setGameState} />
      }
      <div>
        Results Area:
        <p>{JSON.stringify(gameState)}</p>
      </div>
    </div>
  );
}

export default App;
