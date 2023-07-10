import {Box, BoxProps} from "./atomicComponents/box";
import React from "react";

export interface InputBoxProps {
    onDrop: (boxIndex: number) => void;
    inputBox: BoxProps[];
    birth: number;
}

export const InputBox: React.FC<InputBoxProps> = ({ onDrop, inputBox, birth }) => {
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        let boxIndex:number = parseInt(event.dataTransfer.getData('text/plain'));

        //const droppedBoxIndex = boxIndex; // Convert boxIndex to an integer
        //const currentBoxIndex = inputBox.findIndex((box) => box.index === droppedBoxIndex); // Use appropriate condition to match the dropped box ID or index

        onDrop(boxIndex); // Convert boxIndex to an integer
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
                            setBoxes={() => {}} index={index} boxes={[]}
                            color="#ffcc5c"
                            width={130}
                            height={80}
                            birth={box.birth} // {box.birth} - {birth}
                            percent={box.numberValue}
                            numberValue={10}
                            chapter={birth}
                            onDragStart={() => {}}
                        >
                            <th></th>
                        </Box>

                    ))}
                </div>
            </div>
        </div>
    );
};