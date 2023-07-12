import TimeLine from "./atomicComponents/Timeline";
import React, {useState} from "react";
import ManualSlider from "./atomicComponents/ManualSlider"
import {BoxProps} from "./atomicComponents/Box";

interface TurnControllerMechanismProps {
    turnCount: number
    turn: number
    chapter: number
    width: string
    setTurn:( counter:number) => void;
    setChapter: ( chapter:number) => void;
    boxes: BoxProps[];
    setBoxes: (boxes: BoxProps[]) => void;
}
const TurnControllerMechanism: React.FC<TurnControllerMechanismProps> = (props) => {

    const [value, setValue] = useState(0);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(event.target.value, 10);
        if (!isNaN(newValue) && newValue >= -100 && newValue <= 100) {
            setValue(newValue);
        }
    };

    return (
        <div className="App">
            <div style={{backgroundColor: '#f0f0f0', display: "flex", flex: 'wrap',
            flexDirection: "column",
            alignItems: "flex-start",
            }}>

                <TimeLine
                    turnCount={props.turnCount}
                    turn={props.turn}
                    chapter={props.chapter}
                    width="300px"
                    setTurn={props.setTurn}
                    setChapter={props.setChapter}
                    boxes={props.boxes}
                    setBoxes={props.setBoxes}
                    value={value}
                />

                <ManualSlider value={value} text={'Permeability'} handleChange={handleChange}/>
            </div>
            <br/>

        </div>
    );
}; export default TurnControllerMechanism;