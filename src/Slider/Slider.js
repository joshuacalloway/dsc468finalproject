import React, { useState } from 'react';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';

const Slider_com = ({ start = 0, min_val = 0, max_val = 100, step = 1 }) => {

  const [ value, setValue ] = useState(start); 
    return (
    <RangeSlider
            value={value} // value: The current value of the slider.
            min={min_val}
            max={max_val}
            step={step}
            tooltip={"on"} //tooltip always visiable   
    onChange = { changeEvent => setValue(changeEvent.target.value)}
    // onChange: A callback fired when the value prop changes.
            />
  );

};

export default Slider_com
