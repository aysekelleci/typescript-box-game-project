import React, {useState} from "react";
interface manualSliderProps {
    value: number
    setValue: (value: number) => void
    text: string
}

const manualSlider: React.FC<manualSliderProps>= (props) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(event.target.value, 10);
        if (!isNaN(newValue) && newValue >= -100 && newValue <= 100) {
            props.setValue(newValue);
        }
    };

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
                onChange={handleChange}
                className="slider"
            />
        </div>
    );
}; export default manualSlider;

