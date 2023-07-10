import TimeLine from "./timeline";
import React, {useState} from "react";
import ManualSlider from "./manualSlider"

interface TurnControllerMechanismProps {
    turnCount: number
    turn: number
    chapter: number
    width: string
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
                    turnCount={4}
                    turn={6}
                    chapter={1}
                    width="300px"
                />

                <ManualSlider value={value} setValue={setValue} />
            </div>
            <br/>

        </div>
    );
}; export default TurnControllerMechanism;