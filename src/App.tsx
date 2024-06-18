import './App.css';
import { GameCanvas } from './Components/GameCanvas';
import { Game, GameFactory } from './Game/GameFactory';
import React, { useState, useEffect, createRef } from 'react';
import { config as gameConfig } from './Config/GameConfig';
import { Scaler } from "gamecraft-utils"
import { FrameCounter } from './Components/FrameCounter';



function App() {

  const [game, setGame] = useState<Game | null>(null);
  const frameCounterRef = createRef<FrameCounter>();
  


  useEffect(() => {
    async function initializeGame() {

      const initializedGame = await GameFactory.InitializeGame(gameConfig);
      setGame(initializedGame);

    }
    initializeGame();
  }, []);
  if (game) {
    Scaler.addScaling(gameConfig.display.width, gameConfig.display.height, game.renderer);
  }
  return (
    <div className="App">
      {game ? 
          (<div className='game-container'>
            {game.debug ? <FrameCounter ref={frameCounterRef} renderer={game.renderer}/> : null}
            <GameCanvas pixiApp={game.renderer} />
          </div>) : (<p>Loading...</p>)}
    </div>
  );
}

export default App;