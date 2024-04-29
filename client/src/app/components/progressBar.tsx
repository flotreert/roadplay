import React from 'react';
import './progressBar.css';

interface ProgressBarProps {
    progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {    
    const formatedProgress = progress || 0 ;
    return (
        <div className='container'>
          <div className='filler' style={{ width: `${formatedProgress}%` }}>
                <span className='style'>{`${Math.round(progress)}%`}</span>
          </div>
        </div>
      );

};

export default ProgressBar;