'use client';
import React from 'react';
import {useEffect, useState} from 'react';
import { usePathname } from 'next/navigation';
import { useGetTournament } from '@/app/services/tournaments.service';
import ProgressBarHor from '@/app/components/progressBarHor';
import { Tournament } from '../../../client/types/tournaments';
import ParticipateForm from './form';
import Image from 'next/image';

const calculateFilling = (tournament: Tournament) => {
    return Math.floor(tournament.participants.length / tournament.number_of_teams * 100);
};
function convertBinaryToDataURI(bytes: string) {
    const byteCharacters = atob(bytes);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/jpeg' });
    const dataURI = URL.createObjectURL(blob);
    return dataURI;
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
            <div style={{maxWidth:'400px'}}>
                <h1>{selectedTournament.name}</h1>
                <div>
                        {selectedTournament.images && selectedTournament.images.length > 0 && 
                                    <Image src={convertBinaryToDataURI(selectedTournament.images[0])} alt={selectedTournament.name} width={180} height={180}/>
                                    }
                </div>
                
                <div>
                Participants:
                <ProgressBarHor progress={calculateFilling(selectedTournament)} />
                </div>
                <p>{selectedTournament.fees}$</p>
                <p>From {selectedTournament.start_date} to {selectedTournament.end_date}</p>
                <p>{selectedTournament.location}</p>
                <p>{selectedTournament.sex}</p>
                <p>{selectedTournament.category}</p>
                <p>from {selectedTournament.age_group[0]} to {selectedTournament.age_group[1]} years old</p>
                <p>{selectedTournament.description}</p>
            </div>
            <ParticipateForm tournament={selectedTournament} onRefetch={handleRefetch} />
        </main>
    );
};