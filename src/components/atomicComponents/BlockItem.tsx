import '../../App.css';
import React from "react";
import {Box, BoxProps} from "./Box";

interface BlockItemProps {
    setOutputBox: (outputBoxes: BoxProps[]) => void;
    setInputBox: (inputBoxes: BoxProps[]) => void;
    setBoxes: (boxes: BoxProps[]) => void;
    outputBox: BoxProps[];
    inputBox: BoxProps[];
    boxes: BoxProps[];
    setBoxCounter:( counter:number) => void;
    boxCounter: number
    birth: number
    percent: number
    key: number;
    setKey: (key: number) => void;
}
export const BlockItem: React.FC<BlockItemProps> = (props) => {
    const handleDragStart = (event: React.DragEvent<HTMLDivElement>, index:number) => {
        const data = 'block ' + index.toString();
        event.dataTransfer.setData('text/plain', data);
    };
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };
    const handleBoxDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();

        //const boxIndex: number = parseInt(event.dataTransfer.getData('text/plain'));
        const data = event.dataTransfer.getData('text/plain');
        var words = data.split(" ");
        let boxIndex = parseInt(words[1]);
        let type = words[0];

        //const boxType: string = event.dataTransfer.getData('text')
        if( type === 'output') {
            const droppedBox: BoxProps = props.outputBox[boxIndex];
            if (droppedBox !== undefined) {
                const updatedOutputBoxes: BoxProps[] = [...props.outputBox];
                updatedOutputBoxes.splice(boxIndex, 1);

                props.setOutputBox((updatedOutputBoxes));

                props.setBoxes([...props.boxes, {...droppedBox, percent: props.outputBox[boxIndex].numberValue}]);
                props.setBoxCounter(props.boxCounter + 1);
                return;
            }
        }

        if( type === 'input') {
            //input to block item drop
            const droppedBox2: BoxProps = props.inputBox[boxIndex];
            if (droppedBox2 !== undefined) {

                const updatedInputBoxes: BoxProps[] = [...props.inputBox];
                updatedInputBoxes.splice(boxIndex, 1);

                props.setInputBox((updatedInputBoxes));

                props.setBoxes([...props.boxes, {...droppedBox2, percent: props.inputBox[boxIndex].numberValue}]);
                props.setBoxCounter(props.boxCounter + 1);
                return;
            }
        }

        else {
            return;
        }
    }

    function handleClick() {
        props.setBoxCounter(props.boxes.length + 1);

        const newBox: BoxProps = {
            id: props.key,
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

        props.setKey(props.key+1);
        props.setBoxes([...props.boxes, newBox]);
    }

    return (
        <div style={{ marginRight: '80px', flex: '0 0 auto' }} onDrop={handleBoxDrop} onDragOver={handleDragOver}>
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
                            id={box.id}
                            key={box.id}
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