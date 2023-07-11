import React, {useState, useEffect, useRef, CSSProperties} from 'react';
import '..//App.css';
import ReactECharts from 'echarts-for-react';
import {Box} from './atomicComponents/box';
import {BoxProps} from './atomicComponents/box';
import {InputBox} from './inputBox';
import {OutputBox} from './outputBox';
import {OperationBox} from "./operationBox";
import {BlockItem} from "./blockItem";

interface BoxMechanismProps {
    percent: number;
    birth: number;

}
export const BoxMechanism: React.FC<BoxMechanismProps> = (props) => {
    const [boxCounter, setBoxCounter] = useState(3);
    const percent = props.percent;
    const birth = props.birth;
    const [inputBox, setInputBox] = useState<BoxProps[]>([]);
    const [boxes, setBoxes] = useState<BoxProps[]>([
        { color: "#5f8f79", width: 80, height: 80, percent, birth, numberValue: percent, index: 0, chapter: 0, setBoxes: () => {}, boxes: [], onDragStart: () => {}, },
        { color: "#5f8f79", width: 80, height: 80, percent, birth, numberValue: percent, index: 1, chapter: 0, setBoxes: () => {}, boxes: [], onDragStart: () => {}, },
        { color: "#5f8f79", width: 80, height: 80, percent, birth, numberValue: percent, index: 2, chapter: 0, setBoxes: () => {}, boxes: [], onDragStart: () => {}, },
    ]);

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

    const handleDrop = (boxIndex: number) => {
        if(boxIndex === -1 || isNaN(boxIndex)) {
            return boxes;
        }

        const droppedBox2: BoxProps = outputBox[boxIndex];
        if(droppedBox2 != undefined) {
            const updatedOutputBoxes: BoxProps[] = [...outputBox];
            updatedOutputBoxes.splice(boxIndex, 1);

            setOutputBox((updatedOutputBoxes));

            //setBlock items
            setInputBox((prevInputBox) => [
                ...prevInputBox,
                {...droppedBox2, percent: outputBox[boxIndex].numberValue }, // Update the percent value
            ]);

            return boxes;
        }

        const droppedBox = boxes[boxIndex];
        if( boxes[boxIndex] != null) {
            setInputBox((prevInputBox) => [
                ...prevInputBox,
                {...droppedBox, percent: boxes[boxIndex].numberValue}, // Update the percent value
            ]);
            console.log('Box dropped:', boxIndex);
            console.log(boxes[boxIndex].numberValue);

            let experienceValue = Math.floor(calculateExperienceValue() * droppedBox.numberValue) % 100;
            setValue(experienceValue);

            setBoxes((prevBox) => {
                const updatedBox = [...prevBox];
                updatedBox.splice(boxIndex, 1);
                console.log(updatedBox);
                for (let i = 0; i < updatedBox.length; i++)
                    updatedBox[i].index = i;
                return updatedBox;
            });

            setBoxCounter(boxCounter - 1);
        }

        if( boxes[boxIndex] === null) {
            return boxes;
        }


    };

    return (
        <div style={{display: 'flex',  marginTop: '30px'}} >
            <BlockItem setOutputBox={setOutputBox} setInputBox={setInputBox} setBoxes={setBoxes} inputBox={inputBox}
                       outputBox={outputBox} boxes={boxes} setBoxCounter={setBoxCounter} boxCounter={boxCounter}
                       birth={birth} percent={percent} />

            <div style={{display: 'flex', overflowX: 'scroll'}} >
                <InputBox onDrop={handleDrop} inputBox={inputBox} birth={birth}/>

                <OperationBox inputBox={inputBox} setOutputBox={setOutputBox} setInputBox={setInputBox} birth={birth}
                    boxes={boxes} value={value} setValue={setValue}/>

                <OutputBox outputBoxes={outputBox} birth={birth} />
            </div>
        </div>
    );
};




