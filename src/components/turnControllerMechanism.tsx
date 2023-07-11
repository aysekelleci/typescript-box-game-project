import TimeLine from "./timeline";
import React, {useState} from "react";
import ManualSlider from "./manualSlider"

interface TurnControllerMechanismProps {
    turnCount: number
    turn: number
    chapter: number
    width: string
    setTurn:( counter:number) => void;
    setChapter: ( chapter:number) => void;
}
const TurnControllerMechanism: React.FC<TurnControllerMechanismProps> = (props) => {

    const [value, setValue] = useState(0);


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
                />

                <ManualSlider value={value} setValue={setValue} />
            </div>
            <br/>

        </div>
    );
}; export default TurnControllerMechanism;