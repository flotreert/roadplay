'use client';
import React from 'react';
import { Tournament, ParticipantBase } from '@/client/types/tournaments';
import { useGetParticipantTournaments } from '@/app/services/tournaments.service';
import TournamentList  from '../../find-tournament/tournament';	

interface getParticipationProps {
    user_id: number;
}

export default function ParticipationTournaments(getParticipationProps: getParticipationProps) {
    const user_id = getParticipationProps.user_id;
    const { data: participationTournaments } = useGetParticipantTournaments(user_id);
    if (!participationTournaments) {
        return <div>You do not participate in a tournament. <a href="/find-tournament">Find one here</a></div>;
    }
    return (
        <div>
            <h1>Participation Tournaments</h1>
            <TournamentList tournaments={participationTournaments} onClick={(tournament: Tournament) => {
                window.location.href = `/tournament/${tournament.id}`;
            }}/>
        </div>
    );
}