import React, { useState, useEffect } from 'react';
import {BlockItem} from './task2';
import '..//App.css';

interface TimelineProps {
    turnCount: number;
    turn: number;
    chapter: number;
    width: string;
}

const Timeline: React.FC<TimelineProps> = (props) => {
    const [turn, setTurn] = useState(props.turn % props.turnCount);
    const [chapter, setChapter] = useState(props.chapter + Math.floor(props.turn / props.turnCount));//const [colors, setColors] = useState(['#ffffff','#ffffff', '#ffffff','#ffffff', '#ffffff','#ffffff'])

    const percent = 100/ props.turnCount;
    const width = props.width;

    function handleClick() {
        if (turn >= props.turnCount) {
            setTurn(1);
            setChapter(chapter + 1);
        }
        else {
            setTurn(turn + 1);
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
                        FASIL {chapter}
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
                            Array.from({ length: turn }, (v, i) => i).map((index) => (
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
            <div>
                <BlockItem percent={30} birth={chapter*props.turnCount+ turn} onYearChange={handleClick} />
            </div>

        </div>
    );
};
export default Timeline;


