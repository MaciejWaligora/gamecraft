import './App.css';
import { GameCanvas } from './Components/GameCanvas';
import { Game, GameFactory } from './GameFactory';
import React, { useState, useEffect } from 'react';
import { config as gameConfig } from './Config/GameConfig';
import { Scaler } from './Lib/Scaler';



function App() {
  const [game, setGame] = useState<Game | null>(null);

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
      {game ? <GameCanvas pixiApp={game.renderer} /> : <p>Loading...</p>}
    </div>
  );
}

export default App;