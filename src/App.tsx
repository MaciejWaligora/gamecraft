import './App.css';
import { GameCanvas } from './Components/GameCanvas';
import { Game, GameFactory } from './GameFactory';
import React, { useState, useEffect, createRef } from 'react';
import { config as gameConfig } from './Config/GameConfig';
import { Scaler } from "gamecraft-utils";
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
      {game ? <><FrameCounter ref={frameCounterRef} renderer={game.renderer}/><GameCanvas pixiApp={game.renderer} /></>: <p>Loading...</p>}
    </div>
  );
}

export default App;