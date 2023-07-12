import React, { useState, useEffect } from 'react';
import {BoxMechanism} from '../boxMechanism';
import '../../App.css';
import {BoxProps} from "./box";

interface TimelineProps {
    turnCount: number;
    turn: number;
    chapter: number;
    width: string;
    setTurn:( counter:number) => void;
    setChapter: ( chapter:number) => void;
    boxes: BoxProps[];
    setBoxes: (boxes: BoxProps[]) => void;
    value: number;
}

const Timeline: React.FC<TimelineProps> = (props) => {

    const percent = 100/ props.turnCount;
    const width = props.width;

    function handleClick() {
        if (props.turn >= props.turnCount) {
            props.setTurn(1);
            props.setChapter(props.chapter + 1);
            let updatedBoxes = [...props.boxes];
            let count = 0;

            //for(let i=updatedBoxes.length-1; i>=0; i--) {
            for(let i=0; i<updatedBoxes.length; i++) {
                if(updatedBoxes[i].numberValue < props.value) {
                    updatedBoxes[i].index = count;
                    count++;
                    updatedBoxes.splice(i, 1);
                }
            }
            props.setBoxes(updatedBoxes);
        }
        else {
            props.setTurn(props.turn + 1);
        }
    }

    return (
        <div>
            <div style={{display:'flex', flex:'wrap'}}>
                <div style={{
                    boxSizing: "border-box",
                    display: "flex",
                    flex: 'wrap',
                    flexDirection: "column",
                    alignItems: "flex-start",
                    border: "2px solid #ff6f69",
                    maxWidth: width,
                }}>
                    <p style={{
                        margin: 0,
                        marginBottom: "3px",
                        boxSizing: "inherit",
                    }}>
                        FASIL {props.chapter}
                    </p>

                    <div style={{
                        height: "30px",
                        width: "300px",
                        border: "2px solid orange",
                        boxSizing: "inherit",
                        display: "flex",
                        overflow: "hidden",
                    }}>
                        {
                            Array.from({ length: props.turn }, (v, i) => i).map((index) => (
                                <div style={{
                                    minWidth: "60px",
                                    width: `${percent}%`,
                                    height: "100%",
                                    backgroundColor: "#ff6f69",
                                    borderRight: "2px solid black",
                                    borderLeft: index === 0 ? `2px solid black` : '',
                                    borderBottom: "2px solid black",
                                    borderTop: "2px solid black",
                                    boxSizing: "inherit",
                                }}></div>
                            ))
                        }
                    </div>
                </div>

                <button
                    style={{
                        padding: "10px 30px",
                        backgroundColor: "white",
                        border: "4px solid black",
                        //borderRadius: '20px',
                        alignSelf: "flex-end",
                        boxSizing: "inherit",
                        transition: "background-color 0.3s",
                    }}

                    onClick={handleClick}
                    onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = "lightgray"}
                    onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = "white"}
                >
                    &gt;&gt;
                </button>

            </div>

            <br></br>

        </div>
    );
};
export default Timeline;


