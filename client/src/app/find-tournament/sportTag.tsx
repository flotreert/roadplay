import React, { useState } from 'react';
import './sportTag.css';

interface SportTagProps {
    sports: string[];
    onSelect: (selectedSport: string) => void;
}


const SportTag: React.FC<SportTagProps> = ({ sports, onSelect }) => {
    const [selectedSport, setSelectedSport] = useState<string | null>('');

    const handleSelect = (sport: string) => {
        if (selectedSport === sport) {
            setSelectedSport(null);
            onSelect('');
            return;
        }
        setSelectedSport(sport);
        onSelect(sport);
    };

    return (
        <div>
            <ul>
                {sports.map((sport) => (
                    <button 
                        key={sport}
                        onClick={() => handleSelect(sport)}
                        style={{ cursor: 'pointer' }}
                        className={selectedSport === sport ? 'tagActive' : 'tag'}
                        >
                            {sport}
                    </button>
                ))}
            </ul>
        </div>
    );
};

export default SportTag;