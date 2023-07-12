import React, {CSSProperties, useEffect, useRef, useState} from "react";
import {v4 as uuidv4} from "uuid";

export interface BoxProps {
    color: string;
    width: number;
    height: number;
    percent: number;
    birth: number;
    chapter: number;
    numberValue: number; //maybe it can be deleted
    index: number;
    setBoxes: (boxes: BoxProps[]) => void
    boxes: BoxProps[]
    onDragStart: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
    children?: React.ReactNode;
    //key: number;
}
export const Box: React.FC<BoxProps> = (props) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [numberValue, setNumberValue] = useState(props.percent);
    const [newNumber, setNewNumber] = useState(20);
    const modalRef = useRef<HTMLDivElement>(null);
    const boxRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (event.type === 'click') {
                if (modalRef.current && !(modalRef.current.contains(event.target as Node) || boxRef.current?.contains(event.target as Node))) {
                    setModalOpen(false);
                }
            }
        };

        window.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleNumberChange = () => {
        setModalOpen(false);
        const updatedNumberValue = Math.round(numberValue * (100 - newNumber) )/100;
        setNumberValue(updatedNumberValue);
        const updatedBoxes = [...props.boxes];
        updatedBoxes[props.index].numberValue = updatedNumberValue;

        props.setBoxes(updatedBoxes);
    };

    const boxStyle: CSSProperties = {
        backgroundColor: props.color,
        width: `${props.width}px`,
        height: `${props.height}px`,
        marginBottom: '10px',
        border: '2px solid black',
        marginRight: '10px',
        position: 'relative',
    };

    const circleStyle: CSSProperties = {
        position: 'absolute',
        top: '5px',
        right: '0px',
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        backgroundColor: '#ffeead',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const valueStyle = {
        fontSize: '12px',
    };

    const age = props.chapter - props.birth;

    return (
        <div
            className="box"
            ref={boxRef}
            style={boxStyle}
            draggable
            //old version(for react) was onDragStart={props.onDragStart}
            onDragStart={(e) => props.onDragStart(e, props.index)}
        >

            <div onClick={handleOpenModal} style={{flex: 'none', cursor: '-webkit-grab'}} >
                <div style={circleStyle}>
                    <span style={valueStyle}>{age}</span>
                </div>
                <span style={{ fontSize: '28px' }}>{numberValue}%</span>
            </div>
            {modalOpen && (
                <div
                    ref={modalRef}
                    style={{
                        backgroundColor: '#ff6f69',
                        position: 'relative',
                        left: '0px',
                        bottom: '20px',
                        width: '150px',
                        height: '80px',
                        border: '3px solid #73AD21',
                    }}
                >
                    <input
                        type="number"
                        value={newNumber}
                        onChange={(e) => setNewNumber(parseInt(e.target.value))}
                    />
                    <button onClick={handleNumberChange}>Change</button>
                </div>
            )}
            <br />
        </div>
    );
};