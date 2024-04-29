'use client';
import React from 'react';
import { usePathname } from 'next/navigation'
import { mockData } from './mockData';
import ParticipateForm from './form';

export default function TournamentDetails() {
    const route = usePathname();
    const routeParts = route.split('/');
    const id = routeParts[routeParts.length - 1];
    //TODO: Fetch Data from API
    const selectedTournament = mockData.find((item) => item.id === parseInt(id));
    console.log(selectedTournament);
    if (!selectedTournament) {
        return (
            <div>
            <h1>Error 404 </h1>
            <h3>Tournament {id} Not Found </h3>
            Redirect to <a href="/find-tournament">Find Tournament</a>
            </div>
        );}

    return (
        <main>
            <div style={{maxWidth:'400px'}}>
                <h1>{selectedTournament.name}</h1>
                <p>From {selectedTournament.startDate} to {selectedTournament.endDate}</p>
                <p>{selectedTournament.description}</p>
                <p>{selectedTournament.location}</p>
                <p>{selectedTournament.sex}</p>
                <p>{selectedTournament.category}</p>
                <p>{selectedTournament.ageGroup}</p>
                <p>{selectedTournament.fees}$</p>
            </div>
            <ParticipateForm tournament={selectedTournament} />
        </main>
            );
}
