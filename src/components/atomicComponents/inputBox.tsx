import {Box, BoxProps} from "./box";
import React from "react";
import { v4 as uuidv4 } from 'uuid';

export interface InputBoxProps {
    onDrop: (boxIndex: number, type:string) => void;
    inputBox: BoxProps[];
    birth: number;
}

export const InputBox: React.FC<InputBoxProps> = ({ onDrop, inputBox, birth }) => {

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>, index:number) => {
        const data = 'input ' + index.toString();
        event.dataTransfer.setData('text/plain', data);
        //event.dataTransfer.setData('text', "input");
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const data = event.dataTransfer.getData('text/plain');
        let words = data.split(" ");
        let boxIndex = parseInt(words[1]);
        let type = words[0];

        //const droppedBoxIndex = boxIndex; // Convert boxIndex to an integer
        //const currentBoxIndex = inputBox.findIndex((box) => box.index === droppedBoxIndex); // Use appropriate condition to match the dropped box ID or index

        onDrop(boxIndex, type); // Convert boxIndex to an integer
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    return (
        <div onDrop={handleDrop} onDragOver={handleDragOver}>
            <div
                style={{
                    width: '300px',
                    height: '320px',
                    backgroundColor: '#EEEEEE',
                    border: '2px groove',
                    borderStyle: 'double',
                    borderWidth: '10px',
                    overflow: 'auto',
                }}
            >
                <p
                    style={{
                        margin: 0,
                        marginBottom: '3px',
                        boxSizing: 'inherit',
                    }}
                >
                    Input Box
                </p>
                <div style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column-reverse' }}>
                    {inputBox.map((box, index) => (
                        <Box
                            //key={uuidv4()}
                            setBoxes={() => {}} index={index} boxes={[]}
                            color="#ffcc5c"
                            width={130}
                            height={80}
                            birth={box.birth} // {box.birth} - {birth}
                            percent={box.numberValue}
                            numberValue={10}
                            chapter={birth}
                            onDragStart={(event) =>
                                handleDragStart(event , index)}
                        >
                            <th></th>
                        </Box>

                    ))}
                </div>
            </div>
        </div>
    );
};