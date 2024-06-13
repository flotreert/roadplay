'use client';
import React, { useState} from 'react';
import Map from './map';
import TournamentTable from './table';
import { SwitchContainer, SwitchInput, SwitchSlider } from './toggle';
import './page.css';

const FindTournaments: React.FC  = () => {
    const [isTableView, setIsTableView] = useState(true);

    const handleViewChange = () => {
        setIsTableView(!isTableView);
    };

    return (
        <main>
            <div className='change-view'>
                <label style={{fontSize:'x-large'}}>Map</label>
                <SwitchContainer>
                    <SwitchInput type="checkbox" checked={isTableView} onChange={handleViewChange} />
                    <SwitchSlider />
                </SwitchContainer>
                <label style={{fontSize:'x-large'}}>Table</label>
            </div>
            {isTableView? <TournamentTable /> : <Map />}
        </main>
    );
};
export default FindTournaments;