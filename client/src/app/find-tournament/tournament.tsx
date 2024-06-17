import React from 'react';
import Image from 'next/image';
import { Tournament } from '../../client/types/tournaments';
import { convertBinaryToDataURI } from '../components/images';
import ProgressBarHor from '@/app/components/progressBarHor';
import './tournament.css';


interface TournamentListProps {
    tournaments: Tournament[];
    onClick: (tournament: Tournament) => void;
}



const columns = {
    name: 'Name',
    start_date: 'Start Date',
    location: 'Location',
    fees: 'Fees',
    number_of_teams: 'Teams',
    images: 'Images',
} 

const calculateFilling = (tournament: Tournament) => {
    return Math.floor(tournament.participants.length / tournament.number_of_teams * 100);
};

const isDateLessThan10Days = (date: string): boolean => {
    const currentDate = new Date();
    const tournamentDate = new Date(date);
    const differenceInTime = tournamentDate.getTime() - currentDate.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays < 15;
};

const TournamentList: React.FC<TournamentListProps> = ({ tournaments, onClick }) => {
    return (
        <div className='grid-tournament-container'>
        {tournaments?.map((item) => (
            <div className='grid-tournament-item' key={item.id} onClick={() => onClick(item)}>
                <div className='name'>
                    {item.name} 
                </div>
                <div className='name'>
                    {item.images && item.images.length > 0 && 
                    <Image src={convertBinaryToDataURI(item.images[0])} alt={item.name} width={120} height={120}/>
                    }
                </div>
                <div className= 'tournament-info'>
                    <label className='info'>
                        <h5>Teams</h5>
                        {item.number_of_teams}
                    </label>
                    <label className='info'>
                        <h5>Fees</h5>
                        {item.fees}
                    </label>
                    <label className='info'>
                        <h5>Location</h5>
                        {item.location.substring(0, 12)}
                    </label>
                </div>
                <div className='other-info'>
                    <label className='info'>
                        <h5>Start Date</h5>
                        <span style={{ color: isDateLessThan10Days(item.start_date) ? '#d27122' : 'inherit' }}>
                            {item.start_date}
                        </span>
                    </label>
                
                    <div style={{height: '10px'}}>
                        <ProgressBarHor progress={calculateFilling(item)} />
                    </div>
                   
                </div>
                <br/>
                <br/>
            </div>
        ))}
    </div>
    );
};

export default TournamentList;