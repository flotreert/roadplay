import React from 'react';
import './progressBar.css';

interface ProgressBarProps {
    progress: number;
}


const ProgressBarHor: React.FC<ProgressBarProps> = ({ progress }) => {    
    const formatedProgress = isNaN(progress) ? 0 : progress;
    return (
        <div className='container'>
          <div className='filler' style={{ width: `${formatedProgress}%`, 
                                  backgroundColor:  Math.round(progress) > 85 ? '#d27122' : '#4caf50'}}>
          </div>
          <span className='style'>{`${Math.round(progress)}%`}</span>
        </div>
      );

};

export default ProgressBarHor;