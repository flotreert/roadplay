'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { useGetTournament } from '@/app/services/tournaments.service';
import ProgressBar from '@/app/components/progressBar';
import { Tournament } from '@/client';
import ParticipateForm from './form';

const calculateFilling = (tournament: Tournament) => {
    return Math.floor(tournament.current_teams / tournament.number_of_teams * 100);
};

export default function TournamentDetails() {
    const route = usePathname();
    const routeParts = route.split('/');
    const id = Number(routeParts[routeParts.length - 1]); // Convert id to number
    const {data: selectedTournament} =  useGetTournament(id);
    console.log(selectedTournament);
    if (!selectedTournament) {
        return (
            <div>
            <h1>Error 404 </h1>
            <h3>Tournament {id} Not Found </h3>
            Redirect to <a href="/find-tournament">Find Tournament</a>
            </div>
        );
    }


    return (
        <main>
            <div style={{maxWidth:'400px'}}>
                <h1>{selectedTournament.name}</h1>
                
                Participants: 
                <ProgressBar progress={calculateFilling(selectedTournament)} />
                <p>From {selectedTournament.start_date} to {selectedTournament.end_date}</p>
                <p>{selectedTournament.description}</p>
                <p>{selectedTournament.location}</p>
                <p>{selectedTournament.sex}</p>
                <p>{selectedTournament.category}</p>
                <p>{selectedTournament.age_group}</p>
                <p>{selectedTournament.fees}$</p>
            </div>
            <ParticipateForm tournament={selectedTournament} />
        </main>
    );
};