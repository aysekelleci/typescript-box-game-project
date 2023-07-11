import React, {useState} from 'react';
import './App.css';
import TurnControllerMechanism from './components/turnControllerMechanism';
import {BoxMechanism} from "./components/boxMechanism";

const App: React.FC = () => {
    const chapterInit:number= 1;
    const turnInit = 1;
    const turnCount = 4;
    const width = "300px"

    const [turn, setTurn] = useState(turnInit % turnCount);
    const [chapter, setChapter] = useState(chapterInit + Math.floor(turnInit / turnCount));

  return (

      <div className="App">
        <div style={{ backgroundColor: '#f0f0f0' }}>
          <TurnControllerMechanism turnCount={turnCount}
                                   turn={turn}
                                   chapter={chapter}
                                   width= {width}
                                   setTurn={setTurn}
                                   setChapter={setChapter}
              />



            <BoxMechanism percent={30} birth={chapter*turnCount+ turn} />
        </div>
      </div>
  );
};

export default App;
