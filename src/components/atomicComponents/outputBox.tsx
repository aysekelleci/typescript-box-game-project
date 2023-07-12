import {Box, BoxProps} from "./box";
import React from "react";

interface OutputBoxProps {
    outputBoxes: BoxProps[];
    birth: number;
}

export const OutputBox: React.FC<OutputBoxProps>= ({ outputBoxes, birth}) => {
    const handleDragStart = (event:React.DragEvent<HTMLDivElement>, index:string) => {
        const data = "output " + index;
        event.dataTransfer.setData('text/plain', data);
        //event.dataTransfer.setData('text', "output");
    };
    return (
        <div>
            <div
                style={{
                    width: '300px',
                    height: '320px',
                    backgroundColor: '#EEEEEE',
                    border: '2px groove ',
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
                    Output Box
                </p>
                <div style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column-reverse'}}>
                    {outputBoxes.map((box, index) => (
                        <Box
                            setBoxes={() => {}} index={index} boxes={[]}
                            color="#ff6f69"
                            width={130}
                            height={80}
                            birth= {box.birth}  //{box.birth} - {birth}
                            percent={box.percent}
                            numberValue={10}
                            chapter={birth}
                            onDragStart={(event) => handleDragStart(event, index.toString())}
                        >
                            <th></th>
                        </Box>
                    ))}
                </div>
            </div>
        </div>
    );
};