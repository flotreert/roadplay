import React, { useState } from 'react';
import './feesSelector.css';

interface FeesSelectorProps {
    onSelect: (min: number, max: number) => void;
}


const FeesSelector: React.FC<FeesSelectorProps>  = ({onSelect}) => {
    const [maxValue, setMaxValue] = useState(1000);
    const [minValue, setMinValue] = useState(0);

    const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const minValue = parseInt(event.target.value);
        setMinValue(Math.min(maxValue, minValue));
        onSelect(minValue, maxValue);
    };

    const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const maxValue = parseInt(event.target.value);
        setMaxValue(Math.max(maxValue, minValue));
        onSelect(minValue, maxValue);
    };

    return (
        <div className='feesSelector'>
            <span>Fees range: </span>
            <input type="number" value={minValue} onChange={handleMinChange} />
            <span>€</span>
            <span> to </span>
            <input type="number" value={maxValue} onChange={handleMaxChange} />
            <span>€</span>
        </div>
    );
};

export default FeesSelector;