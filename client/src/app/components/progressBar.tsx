import React from 'react';
import './progressBar.css';

interface ProgressBarProps {
    progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {    
    const formatedProgress = progress || 0 ;
    return (
        <div className='barcontainer'>
          <div className='circle'></div>
          <div className='bar' style={{ height: `${formatedProgress}%` }}>
          </div>
        </div>
      );

};

export default ProgressBar;