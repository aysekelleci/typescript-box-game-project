import React, {useState, useEffect, useRef, CSSProperties} from 'react';
import '..//App.css';
import ReactECharts from 'echarts-for-react';
import {Box} from './atomicComponents/box';
import {BoxProps} from './atomicComponents/box';
import {InputBox} from './atomicComponents/inputBox';
import {OutputBox} from './atomicComponents/outputBox';
import {OperationBox} from "./atomicComponents/operationBox";
import {BlockItem} from "./atomicComponents/blockItem";

interface BoxMechanismProps {
    percent: number;
    birth: number;
    boxes: BoxProps[];
    setBoxes: (boxes: BoxProps[]) => void;
    key: number;
    setKey: (key: number) => void;
}
export const BoxMechanism: React.FC<BoxMechanismProps> = (props) => {
    //const [key, setKey] = useState(0);
    const [boxCounter, setBoxCounter] = useState(3);
    const percent = props.percent;
    const birth = props.birth;
    const [inputBox, setInputBox] = useState<BoxProps[]>([]);

    const [outputBox, setOutputBox] = useState<BoxProps[]>([]);

    // MANUAL SLIDER
    const [value, setValue] = useState(0);

    const calculateExperienceValue = () => {
        let totalMultiplication = 1;

        inputBox.forEach((box: BoxProps) => {
            totalMultiplication *= box.numberValue;
        });
        return Math.floor(totalMultiplication % 100);
    };

    const handleDrop = (boxIndex: number, type:string) => {
        if(boxIndex === -1 || isNaN(boxIndex)) {
            return props.boxes;
        }

        if( type === 'output') {
            const droppedBox2: BoxProps = outputBox[boxIndex];
            if (droppedBox2 != undefined) {
                const updatedOutputBoxes: BoxProps[] = [...outputBox];
                updatedOutputBoxes.splice(boxIndex, 1);

                setOutputBox((updatedOutputBoxes));

                //setBlock items
                setInputBox((prevInputBox) => [
                    ...prevInputBox,
                    {...droppedBox2, percent: outputBox[boxIndex].numberValue}, // Update the percent value
                ]);

                return props.boxes;
            }
        }

        if( type === 'block') {
            const droppedBox = props.boxes[boxIndex];
            if (props.boxes[boxIndex] != null) {
                setInputBox((prevInputBox) => [
                    ...prevInputBox,
                    {...droppedBox, percent: props.boxes[boxIndex].numberValue}, // Update the percent value
                ]);
                //console.log('Box dropped:', boxIndex);
                //console.log(props.boxes[boxIndex].numberValue);

                let experienceValue = Math.floor(calculateExperienceValue() * droppedBox.numberValue) % 100;
                setValue(experienceValue);

                const updatedBox = [...props.boxes];
                updatedBox.splice(boxIndex, 1);

                for (let i = 0; i < updatedBox.length; i++) {
                    updatedBox[i].index = i;
                }

                props.setBoxes(updatedBox);
                setBoxCounter(boxCounter - 1);
                //console.log(updatedBox);
            }

            if (props.boxes[boxIndex] === null) {
                return props.boxes;
            }
        }
    };

    return (
        <div style={{display: 'flex',  marginTop: '30px'}} >
            <BlockItem setOutputBox={setOutputBox} setInputBox={setInputBox} setBoxes={props.setBoxes} inputBox={inputBox}
                       outputBox={outputBox} boxes={props.boxes} setBoxCounter={setBoxCounter} boxCounter={boxCounter}
                       birth={birth} percent={percent} key={props.key} setKey={props.setKey}/>

            <div style={{display: 'flex', overflowX: 'scroll'}} >
                <InputBox onDrop={handleDrop} inputBox={inputBox} birth={birth}/>

                <OperationBox inputBox={inputBox} setOutputBox={setOutputBox} setInputBox={setInputBox} birth={birth}
                    boxes={props.boxes} value={value} setValue={setValue} key={props.key} setKey={props.setKey}/>

                <OutputBox outputBoxes={outputBox} birth={birth} />
            </div>
        </div>
    );
};




