import React, { useState } from 'react';
import RangeSlider from 'rc-slider';
import 'rc-slider/assets/index.css';

const Textlengthrange = (props) => {
 
    const [value, setValue] = useState(300);

    const handleChangeStart = (value) => {
      // console.log('Change started:', value);
    }
  
    const handleChange = (value) => {
      setValue(value);
      props.onSelectCharacters(value);            
    }
  
    const handleChangeComplete = (value) => {
      // console.log('Change complete:', value);
    }

    
 
  return (
    <>
    <div className='text-length-range'>
      <RangeSlider 
        min={200}
        max={1000}
        value={value}
        onChange={handleChange}
        onChangeStart={handleChangeStart}
        onChangeComplete={handleChangeComplete}
        step={0}
      />
        <div className='range-count'>{value}/1000</div>
    </div>
    </>
  )
}

export default Textlengthrange