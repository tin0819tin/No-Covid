import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

const Progress = ({ uploaded }) => {

  let font = (uploaded)? "100%" : "0%"
  return (
    <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}> 
        <div className='progress' style={{width:"50%" , justifyContent:"center" }}>
            <div
                className='progress-bar progress-bar-striped progress-bar-animated bg-success'
                role='progressbar'
                style={{ width: uploaded? "100%": "0%" }}
            >
               {font} 
            </div>
        </div>
    </div> 
  );
};

Progress.propTypes = {
  uploaded: PropTypes.string
};

export default Progress;

{/* <div style={{display:-"ms-flexbox", display:"flex", height:"1rem", overflow:"hidden", fontSize:".75rem", backgroundColor:"#e9ecef", borderRadius:".25rem", width:"50%", justifyContent:"center"}}>
        <div
          className='progress-bar progress-bar-striped bg-success'
          role='progressbar'
          style={{ width: `${percentage/2}%`, }}
        >
          {percentage}%
      </div>
    </div> */}