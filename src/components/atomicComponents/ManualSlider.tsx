import React, {useState} from "react";
interface manualSliderProps {
    value: number
    text: string
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ManualSlider: React.FC<manualSliderProps>= (props) => {

    return (
        <div style={{display: 'flex', marginTop: '-30px'}}>
            <p style={{ marginTop: '0px', margin: 0, marginBottom: '0px', boxSizing: 'inherit', fontSize: '14px', fontWeight: 'bold'}} >
                {props.text}: {props.value}</p>

            <input
                style={{width: '200px'}}
                type="range"
                min="0"
                max="100"
                value={props.value}
                onChange={props.handleChange}
                className="slider"
            />
        </div>
    );
}; export default ManualSlider;

