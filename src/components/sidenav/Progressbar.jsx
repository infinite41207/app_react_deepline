import React, {useState} from 'react';

const Progressbar = () => {
  
  const [completed, setCompleted] = useState('0');
 
  const railStyle = {
    height: '4px',
    width: '100%',
    backgroundColor: "#E2E8F0",
    borderRadius: '100px',
  }

  const trackStyle = {
    height: '100%',
    width: `${completed}%`,
    background: 'linear-gradient(90deg, #FFA010 0%, #FF1EDB 100%)',
    borderRadius: 'inherit',
    textAlign: 'left',
  }

  return (
    <div style={railStyle}>
    <div style={trackStyle}>
      {/* <span progressStatus={`${completed}%`}></span> */}
    </div>
  </div>
  )
}

export default Progressbar