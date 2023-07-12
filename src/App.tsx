import React, {useState} from 'react';
import './App.css';
import TurnControllerMechanism from './components/TurnControllerMechanism';
import {BoxMechanism} from "./components/BoxMechanism";
import {BoxProps} from "./components/atomicComponents/Box";

const App: React.FC = () => {
    const chapterInit:number= 1;
    const turnInit = 1;
    const turnCount = 4;
    const width = "300px"
    const percent = 40;

    const [turn, setTurn] = useState(turnInit % turnCount);
    const [chapter, setChapter] = useState(chapterInit + Math.floor(turnInit / turnCount));

    const birth= chapter*turnCount+ turn

    const [key, setKey] = useState(0)

    const [boxes, setBoxes] = useState<BoxProps[]>([
        { color: "#5f8f79", width: 80, height: 80, percent: 32, birth, numberValue: 32, index: 0, chapter: 0, setBoxes: () => {}, boxes: [], onDragStart: () => {}, id:0},
        { color: "#5f8f79", width: 80, height: 80, percent, birth, numberValue: percent, index: 1, chapter: 0, setBoxes: () => {}, boxes: [], onDragStart: () => {},id:1},
        { color: "#5f8f79", width: 80, height: 80, percent, birth, numberValue: percent, index: 2, chapter: 0, setBoxes: () => {}, boxes: [], onDragStart: () => {}, id:2},
    ]);

  return (

      <div className="App">
        <div style={{ backgroundColor: '#f0f0f0' }}>
          <TurnControllerMechanism turnCount={turnCount}
                                   turn={turn}
                                   chapter={chapter}
                                   width= {width}
                                   setTurn={setTurn}
                                   setChapter={setChapter}
                                   boxes={boxes}
                                   setBoxes={setBoxes}
              />



            <BoxMechanism percent={percent} birth={chapter*turnCount+ turn} boxes={boxes} setBoxes={setBoxes} key={key}
                          setKey={setKey}/>
        </div>
      </div>
  );
};

export default App;
