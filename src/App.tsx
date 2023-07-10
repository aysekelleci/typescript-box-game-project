import React from 'react';
import './App.css';
import TurnControllerMechanism from './components/turnControllerMechanism';
import {BoxMechanism} from "./components/boxMechanism";

const App: React.FC = () => {
    const chapter:number= 1;
    const turn = 6;
    const turnCount = 4;
    const width = "300px"

  return (

      <div className="App">
        <div style={{ backgroundColor: '#f0f0f0' }}>
          <TurnControllerMechanism turnCount={turnCount}
                                   turn={turn}
                                   chapter={chapter}
                                   width= {width}/>



            <BoxMechanism percent={30} birth={chapter*turnCount+ turn} />
        </div>
      </div>
  );
};

export default App;
