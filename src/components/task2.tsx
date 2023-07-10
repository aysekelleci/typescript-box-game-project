import React, {useState, useEffect, useRef, CSSProperties} from 'react';
import '..//App.css';
import ReactECharts from 'echarts-for-react';
import {Box} from './box';
import {BoxProps} from './box';
import {InputBox} from './inputBox';
import {OutputBox} from './outputBox';

interface BlockItemProps {
    percent: number;
    birth: number;
    onYearChange: () => void;
}
export const BlockItem: React.FC<BlockItemProps> = (props) => {
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
    let operation = 1;

    // MANUAL SLIDER
    const [value, setValue] = useState(0);
    const [operationName, setOperationName] = useState('same');
    const [deprecationValue, setDeprecationValue] = useState(0);
    const [experienceValue, setExperienceValue] = useState(3);
    const [modalOpen, setModalOpen] = useState(false);
    const operationModalRef = useRef(null);

    let experienceValueArray: number[] = [0];
    const [experienceModalOpen, setExperienceModalOpen] = useState(false);
    const graphOption = {
        xAxis: {
            data: ['A', 'B', 'C', 'D', 'E']
        },
        yAxis: {},
        series: [
            {
                data: [10, 22, 28, 23, 19],
                type: 'line',
                areaStyle: {}
            },
        ]
    };

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleExperienceOpenModal = () => {
        setExperienceModalOpen(true);
    }

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleExperienceCloseModal = () => {
        setExperienceModalOpen(false);
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(event.target.value, 10);
        if (!isNaN(newValue) && newValue >= -100 && newValue <= 100) {
            setValue(newValue);
        }
        if(newValue<= 50) {
            setOperationName('less');
        }

        else if( newValue> 50 && newValue<=80)
            setOperationName('same');

        else
            setOperationName('more');
    };

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>, index:number) => {
        event.dataTransfer.setData('text/plain', index.toString());
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };
    const handleOutputBoxDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const boxIndex: number = parseInt(event.dataTransfer.getData('text/plain'));

        const droppedBox: BoxProps= outputBox[boxIndex];

        if(droppedBox === undefined) {
            return;
        }

        setOutputBox((prevBoxes) => {
            const updatedBoxes = [...prevBoxes];
            updatedBoxes.splice(boxIndex, 1);
            return updatedBoxes;
        });

        setBoxes((prevBoxes) =>  [
            ...prevBoxes,
            { ...droppedBox, percent: outputBox[boxIndex].numberValue }, // Update the percent value
        ]);

    };

    const handleDrop = (boxIndex: number) => {
        if(boxIndex === -1 || isNaN(boxIndex)) {
            return boxes;
        }
        const droppedBox = boxes[boxIndex];
        if( boxes[boxIndex] === null) {
            return boxes;
        }

        setInputBox((prevInputBox) => [
            ...prevInputBox,
            { ...droppedBox, percent: boxes[boxIndex].numberValue }, // Update the percent value
        ]);
        console.log('Box dropped:', boxIndex);
        console.log(boxes[boxIndex].numberValue);

        let experienceValue = Math.floor(calculateExperienceValue()* droppedBox.numberValue) %100;
        setValue(experienceValue);

        setBoxes((prevBox) => {
            const updatedBox = [...prevBox];
            updatedBox.splice(boxIndex, 1);
            console.log(updatedBox);
            for( let i=0; i < updatedBox.length; i++)
                updatedBox[i].index = i;
            return updatedBox;
        });

    };

    function handleClick() {
        setBoxCounter(boxCounter + 1);

        setBoxes((prevBoxes) => {
            const newBox: BoxProps = {
                color: "#5f8f79",
                percent: percent,
                birth: birth,
                numberValue:percent,
                setBoxes: () => {},
                index: boxes.length,
                boxes: [],
                width: 130,
                height: 80,
                chapter: 0,
                onDragStart: () => {}
            };
            return [...prevBoxes, newBox];
        });
    }

    const calculateTotalNumberValue = () => {
        let totalNumberValue = 0;

        inputBox.forEach((box: BoxProps) => {
            totalNumberValue += box.numberValue;
        });

        return totalNumberValue;
    };

    const calculateExperienceValue = () => {
        let totalMultiplication = 1;

        inputBox.forEach((box: BoxProps) => {
            totalMultiplication *= box.numberValue;
        });

        return Math.floor(totalMultiplication % 100);
    };

    const createNewBoxes = (totalNumberValue:number, length:number) => {
        const newValue = (totalNumberValue / length);

        const newBoxes: BoxProps[] = [];
        for (let i = 0; i < length; i++) {
            const newBox: BoxProps = {
                color: "#5f8f79",
                width: 80,
                height: 80,
                percent: newValue,
                birth: birth,
                numberValue: newValue,
                setBoxes: () => {},
                index: boxes.length + i,
                boxes: [],
                chapter: 0,
                onDragStart: () => {}
            };
            newBoxes.push(newBox);
        }
        setOutputBox(newBoxes);

        setInputBox([]);
    };

    function handleOperation() {
        let totalNumberValue = calculateTotalNumberValue();
        let experienceValue = calculateExperienceValue();
        setValue(experienceValue);
        totalNumberValue = ((100-deprecationValue)*totalNumberValue)/100;
        const length = inputBox.length;
        console.log("nom");
        if(value<= 50)
            operation = 0 ;

        else if( value> 50 && value<=80)
            operation = 1;

        else
            operation = 2;


        if (operation === 0) //it means decrement
        {
            //Math.floor(Math.random() * (max - min + 1)) + min;
            let boxCount = Math.floor( Math.random() * (length));
            createNewBoxes(totalNumberValue, boxCount);
            //in for loop, calculate total value and divide array length-1
        }
        if (operation === 1) //it means stay same
        {
            let boxCount = Math.floor( Math.random() * (length)) +1;
            createNewBoxes(totalNumberValue, boxCount);
            //in for loop, calculate total value and divide array length

        }
        if (operation === 2) //it means increment
        {
            //in for loop, calculate total value and divide array length+1
            let boxCount = Math.floor( Math.random() * (length +1 )) + length;
            createNewBoxes(totalNumberValue, boxCount);
        }
        setDeprecationValue(deprecationValue + length)
        setExperienceValue(experienceValue);
        experienceValueArray.push(experienceValue)

        //for each delete input boxes and create new ones
    }


    return (
        <div style={{display: 'flex',  marginTop: '30px'}} >
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
                        Block Items: {boxCounter}
                    </p>
                    <div style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column-reverse'}}>
                        {boxes.map((box, index) => (
                            <Box
                                setBoxes={setBoxes} index={index} boxes={boxes}
                                color="#5f8f79"
                                width={130}
                                height={80}
                                percent={box.percent}
                                birth={box.birth}
                                chapter={birth}
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
            <div style={{display: 'flex', overflowX: 'scroll'}} >
                <InputBox onDrop={handleDrop} inputBox={inputBox} birth={birth}/>

                <div style={{marginLeft: '40px', marginRight: '60px', marginTop: '30px'}}>
                    <p style={{ marginTop: '0px', margin: -10, marginBottom: '0px', boxSizing: 'inherit', fontSize: '14px'}} > value: {value}</p>

                    <input
                        style={{width: '200px'}}
                        type="range"
                        min="0"
                        max="100"
                        value={value}
                        onChange={handleChange}
                        className="slider"
                    />

                    <div
                        style={{
                            width: '300px',
                            height: '250px',
                            backgroundColor: '#ffeead',
                            border: '2px dashed black',
                            borderRadius: '20px',
                            overflow: 'auto',
                        }}
                    >

                        <p style={{ margin: 0, marginBottom: '15px', boxSizing: 'inherit', backgroundColor: '#999999'}} > Operation Box </p>

                        <p style={{ margin: 0, marginBottom: '3px', boxSizing: 'inherit', fontSize: '24px', cursor: '-webkit-grab'}}
                           onClick={handleOpenModal}>
                            Deprecation: {deprecationValue}%
                        </p>
                        <hr></hr>

                        <p style={{ margin: 0, marginBottom: '3px', boxSizing: 'inherit', fontSize: '24px', cursor: '-webkit-grab'}}
                           onClick={handleExperienceOpenModal}>
                            Experience: {experienceValue}%
                        </p>
                        <hr></hr>

                        <p style={{ margin: 0, marginBottom: '3px', boxSizing: 'inherit', fontSize: '24px'}} >
                            Operation: {operationName}
                        </p>

                        {modalOpen && (
                            <div
                                ref={operationModalRef}
                                style={{
                                    backgroundColor: '#ff6f69',
                                    position: 'relative',
                                    left: '80px',
                                    bottom: '130px',
                                    width: '180px',
                                    height: '100px',
                                    border: '3px solid #73AD21',
                                }}
                            >
                                <input
                                    type="number"
                                    value={deprecationValue}
                                    onChange={(e) => setDeprecationValue(parseInt(e.target.value))}
                                />
                                <button onClick={handleCloseModal}>Close</button>
                            </div>
                        )}

                    </div>

                    <button
                        style={{
                            marginTop: "10px",
                            padding: "10px 30px",
                            backgroundColor: "'#CCCCCC'",
                            border: "4px solid black",
                            borderRadius: '20px',
                            alignSelf: "flex-end",
                            boxSizing: "inherit",
                            transition: "background-color 0.3s",
                            fontSize: "25px"
                        }}
                        onClick={handleOperation}
                        onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = "lightgray"}
                        onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = "white"}
                    >
                        &gt;&gt;
                    </button>

                    {experienceModalOpen && (
                        <div
                            ref={operationModalRef}
                            style={{
                                backgroundColor: '#ff6f69',
                                position: 'relative',
                                left: '80px',
                                bottom: '200px',
                                width: '450px',
                                height: '500px',
                                border: '3px solid #73AD21',
                            }}
                        >
                            <input
                                type="number"
                                value={deprecationValue}
                                onChange={(e) => setDeprecationValue(parseInt(e.target.value))}
                            />
                            <button onClick={handleExperienceCloseModal}>Change</button>
                            <button onClick={handleExperienceCloseModal}>Close</button>

                            <ReactECharts
                                option={graphOption}
                                style={{ height: 400 }}
                                // opts={{ locale: 'FR' }}
                            />
                        </div>
                    )}
                </div>

                <OutputBox outputBoxes={outputBox} birth={birth} />
            </div>
        </div>
    );
};




