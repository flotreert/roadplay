'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useGetTournament } from '@/app/services/tournaments.service';
import ProgressBarHor from '@/app/components/progressBarHor';
import ParticipateForm from './form';
import { calculateFilling, isDateLessThan10Days } from '@/app/components/utils';
import { convertBinaryToDataURI } from '@/app/components/images';
import './page.css';

const imageSports: { [key: string]: string } = {
    'Football': '/football.png',
    'Basketball': '/basketball.png',
    'Tennis': '/tennis.png',
    'Volleyball': '/volleyball.png',
}


export default function TournamentDetails() {
    const route = usePathname();
    const routeParts = route.split('/');
    const id = Number(routeParts[routeParts.length - 1]); // Convert id to number
    const [tournamentId, setTournamentId] = useState(id);
    const { data: selectedTournament, refetch } = useGetTournament(tournamentId);

    const handleRefetch = () => {
        refetch();
        window.location.reload();
    };

    useEffect(() => {
        setTournamentId(id);
    }, [id]);

    if (!selectedTournament) {
        return (
            <div>
                <h1>Error 404 </h1>
                <h3>Tournament {id} Not Found </h3>
                Redirect to <a href="/find-tournament">Find Tournament</a>
            </div>
        );
    }

    // TODO: Get participants age and check if it matches the tournament age group
    // TODO: Distance to user position
    return (
        <main>
            <div className='tournament'>
                <h1>{selectedTournament.name}</h1>
                <div>
                    {selectedTournament.images && selectedTournament.images.length > 0 &&
                        <Image src={convertBinaryToDataURI(selectedTournament.images[0])} alt={selectedTournament.name} width={180} height={180} />
                    }
                </div>

                <div>
                </div>
                <div>
                    <ParticipateForm tournament={selectedTournament} onRefetch={handleRefetch} />
                </div>
                <div className='tournament-info'>
                    <div className='info'>
                        <h5>Sport</h5>
                        <Image src={imageSports[selectedTournament.sport]} alt={selectedTournament.sport} width={50} height={50} />
                    </div>
                    <label className='info'>
                        <h5>Fees</h5>
                        <div>{selectedTournament.fees}</div>
                    </label>
                    <label className='info'>
                        <h5>Location</h5>
                        <div>{selectedTournament.location.substring(0, 12)}</div>
                    </label>
                    <label className='info'>
                        <h5>Age</h5>
                        <div>{selectedTournament.age_group[0]}-{selectedTournament.age_group[1]}</div>
                    </label>
                </div>
                <div className='other-info'>
                    <div className='tournament-info'>
                        <label className='info'>
                            <h5>Start Date</h5>
                            <span style={{ color: isDateLessThan10Days(selectedTournament.start_date) ? '#d27122' : 'inherit' }}>
                                {selectedTournament.start_date}
                            </span>
                        </label>
                        <label className='info'>
                            <h5>End Date</h5>
                            <span style={{ color: isDateLessThan10Days(selectedTournament.start_date) ? '#d27122' : 'inherit' }}>
                                {selectedTournament.end_date}
                            </span>
                        </label>
                        <label className='info'>
                            <h5>Teams</h5>
                            <div>
                                {selectedTournament.number_of_teams}
                            </div>
                        </label>
                        <label className='info'>
                            <h5>Sex</h5>
                            <div>
                                {selectedTournament.sex}
                            </div>
                        </label>
                    </div>

                    <div className='description'>
                        <h5>Some words from {selectedTournament.organizer_id}:</h5>
                        <div className='text-description'>
                            {selectedTournament.description}
                        </div>
                    </div>
                    <div>
                        <h5>They will come</h5>
                        <div>
                            <div style={{ display: 'flex' }}>
                                {selectedTournament.participants.map((participant) => (
                                    <div style={{ margin: '10px' }} key={participant}>
                                        <a href={"/users/"+participant}>{participant}</a>
                                    </div>
                                ))}
                            </div>
                            <div style={{ height: '10px', alignItems: 'center', justifyContent: 'center' }}>
                                <ProgressBarHor progress={calculateFilling(selectedTournament)} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
};