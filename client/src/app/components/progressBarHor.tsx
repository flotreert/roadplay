import React from 'react';
import './progressBar.css';

interface ProgressBarProps {
    progress: number;
}


const ProgressBarHor: React.FC<ProgressBarProps> = ({ progress }) => {    
    const formatedProgress = progress || 0 ;
    return (
        <div className='container'>
          <div className='filler' style={{ width: `${formatedProgress}%` }}>
          </div>
          <span className='style'>{`${Math.round(progress)}%`}</span>
        </div>
      );

};

export default ProgressBarHor;