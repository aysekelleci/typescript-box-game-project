import '..//App.css';
import React, {useState} from "react";
import {Box, BoxProps} from "./atomicComponents/box";

interface BlockItemProps {
    setOutputBox: (outputBoxes: BoxProps[]) => void;
    setInputBox: (inputBoxes: BoxProps[]) => void;
    setBoxes: (boxes: BoxProps[]) => void;
    outputBox: BoxProps[];
    boxes: BoxProps[];
    setBoxCounter:( counter:number) => void;
    boxCounter: number
    birth: number
    percent: number
}
export const BlockItem: React.FC<BlockItemProps> = (props) => {
    const [updatedBoxes, setUpdatedBoxes] = useState<BoxProps[]>(props.boxes)
    const handleDragStart = (event: React.DragEvent<HTMLDivElement>, index:number) => {
        event.dataTransfer.setData('text/plain', index.toString());
    };
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };
    const handleOutputBoxDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const boxIndex: number = parseInt(event.dataTransfer.getData('text/plain'));

        const droppedBox: BoxProps = props.outputBox[boxIndex];

        if (droppedBox === undefined) {
            return;
        }

        /*
        props.setOutputBox((prevBoxes: BoxProps[]) => {
            const updatedBoxes = [...prevBoxes];
            updatedBoxes.splice(boxIndex, 1);
            return updatedBoxes;
        });


        setBoxes((prevBoxes) =>  [
            ...prevBoxes,
            { ...droppedBox, percent: outputBox[boxIndex].numberValue }, // Update the percent value
        ]);
         */

        const updatedOutputBoxes: BoxProps[] = [...props.outputBox];
        updatedOutputBoxes.splice(boxIndex, 1);

        props.setOutputBox((updatedOutputBoxes));

        //setBlock items
        setUpdatedBoxes((prevBoxes) => [
            ...prevBoxes,
            {...droppedBox, percent: props.outputBox[boxIndex].numberValue}, // Update the percent value
        ]);

        props.setBoxes([...props.boxes, {...droppedBox, percent: props.outputBox[boxIndex].numberValue} ]);
        props.setBoxCounter( props.boxCounter + 1);
    }

    function handleClick() {
        props.setBoxCounter(props.boxes.length + 1);

        const newBox: BoxProps = {
            color: "#5f8f79",
            percent: props.percent,
            birth: props.birth,
            numberValue: props.percent,
            setBoxes: () => {},
            index: props.boxes.length,
            boxes: [],
            width: 130,
            height: 80,
            chapter: 0,
            onDragStart: () => {}
        };

        props.setBoxes([...props.boxes, newBox]);

    }

    return (
        <div style={{ marginRight: '80px', flex: '0 0 auto' }} onDrop={handleOutputBoxDrop} onDragOver={handleDragOver}>
            <div
                style={{
                    width: '170px',
                    height: '700px',
                    backgroundColor: '#EEEEEE',
                    border: '2px groove',
                    overflow: 'auto',
                }}
            >
                <p
                    style={{
                        margin: 0,
                        marginBottom: '3px',
                        boxSizing: 'inherit',
                        fontSize: '16px'
                    }}
                >
                    Block Items: {props.boxCounter}
                </p>
                <div style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column-reverse'}}>
                    {props.boxes.map((box, index) => (
                        <Box
                            setBoxes={props.setBoxes} index={index} boxes={props.boxes}
                            color="#5f8f79"
                            width={130}
                            height={80}
                            percent={box.percent}
                            birth={box.birth}
                            chapter={props.birth}
                            numberValue={box.numberValue}
                            onDragStart={(event) =>
                                handleDragStart(event , index)}
                        >
                            <th></th>
                        </Box>

                    ))}
                </div>
            </div>

            <br/>
            <div style={{marginTop: '-20px'}}>
                <button
                    style={{
                        padding: '5px 30px',
                        backgroundColor: 'white',
                        flexDirection: 'column',
                        border: '4px solid black',
                        borderRadius: '20px',
                        //justifyContent: 'center',
                        fontSize: '30px',
                        transition: 'background-color 0.3s',
                    }}
                    onClick={handleClick}
                    onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = "lightgray"}
                    onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = "white"}
                >
                    +
                </button>
            </div>
        </div>
    );
};