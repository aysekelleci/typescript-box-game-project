import {BoxProps} from "./atomicComponents/box";
import React, {useRef, useState} from "react";
import ReactECharts from "echarts-for-react";

interface OperationBoxProps {
    inputBox: BoxProps[];
    setOutputBox: (boxes: BoxProps[]) => void
    setInputBox: (inputBoxes: BoxProps[]) => void
    birth: number
    boxes: BoxProps[];
    value: number;
    setValue: (value: number) => void
}

export const OperationBox: React.FC<OperationBoxProps>= (props) => {

    const [modalOpen, setModalOpen] = useState(false);
    const operationModalRef = useRef(null);

    const [deprecationValue, setDeprecationValue] = useState(0);
    const [experienceValue, setExperienceValue] = useState(0);
    const [operationName, setOperationName] = useState('same');

    let experienceValueArray: number[] = [0];
    let operation = 1;

    // MANUAL SLIDER
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

    const handleCloseModal = () => {
        setModalOpen(false);
    };
    const handleExperienceOpenModal = () => {
        setExperienceModalOpen(true);
    }

    const handleExperienceCloseModal = () => {
        setExperienceModalOpen(false);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(event.target.value, 10);
        if (!isNaN(newValue) && newValue >= -100 && newValue <= 100) {
            props.setValue(newValue);
        }
        if(newValue<= 50) {
            setOperationName('less');
        }

        else if( newValue> 50 && newValue<=80)
            setOperationName('same');

        else
            setOperationName('more');
    };


    const calculateTotalNumberValue = () => {
        let totalNumberValue = 0;

        props.inputBox.forEach((box: BoxProps) => {
            totalNumberValue += box.numberValue;
        });

        return totalNumberValue;
    };

    const calculateExperienceValue = () => {
        let totalMultiplication = 1;

        props.inputBox.forEach((box: BoxProps) => {
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
                birth: props.birth,
                numberValue: newValue,
                setBoxes: () => {},
                index: props.boxes.length + i,
                boxes: [],
                chapter: 0,
                onDragStart: () => {}
            };
            newBoxes.push(newBox);
        }
        props.setOutputBox(newBoxes);

        props.setInputBox([]);
    };

    function handleOperation() {
        let totalNumberValue = calculateTotalNumberValue();
        let experienceValue = calculateExperienceValue();
        props.setValue(experienceValue);
        totalNumberValue = ((100-deprecationValue)*totalNumberValue)/100;
        const length = props.inputBox.length;
        if(props.value<= 50)
            operation = 0 ;

        else if( props.value> 50 && props.value<=80)
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
        <div style={{marginLeft: '40px', marginRight: '60px', marginTop: '30px'}}>
            <p style={{ marginTop: '0px', margin: -10, marginBottom: '0px', boxSizing: 'inherit', fontSize: '14px'}} > value: {props.value}</p>

            <input
                style={{width: '200px'}}
                type="range"
                min="0"
                max="100"
                value={props.value}
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
    );
};
