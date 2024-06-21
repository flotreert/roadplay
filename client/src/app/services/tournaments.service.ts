import {useQuery, useMutation, UseMutationOptions} from '@tanstack/react-query';
import { TournamentDisplay } from '@/client/types/tournaments';
import { TournamentsService } from '@/client';
import { ParticipantsService } from '@/client/services/tournaments_manager';

const actions = {createTournament: ()  => ({
    mutationFn: (data: TournamentDisplay) => TournamentsService.createTournamentTournamentsPost({requestBody: data}),
    mutationKey: ['createTournament', 'create'],
    onSuccess: () => {
        console.log('Tournament created successfully');
    },
    onError: (error: any) => {
        window.alert('Error creating tournament' + error);
    }
    }),
    fillTournament: ()  => ({
        mutationFn: (id: number) => TournamentsService.fillTournamentTournamentsTournamentIdFillPut({tournamentId: id}),
        mutationKey: ['fillTournament', 'fill'],
        onSuccess: () => {
            window.alert('Tournament filled successfully');
        },
        onError: (error: any) => {
            window.alert('Error filling tournament' + error);
        }
    })
    }
export const useCreateTournament = () => {
    return useMutation(actions.createTournament());
}

export const useFillTournament = () => {
    return useMutation(actions.fillTournament());
}

export const useGetTournaments = () => {
    return useQuery({
        queryFn: () => TournamentsService.getTournamentsTournamentsGet(),
        queryKey: ['getTournaments', 'list'],
    });
}

export const useGetTournament = (id: number) => {
    return useQuery({
        queryFn: () => TournamentsService.getTournamentTournamentsTournamentIdGet({tournamentId: id}),
        queryKey: ['getTournament', id],
    });
}

export const useGetParticipantMe = () => {
    return useQuery({
        queryFn: () => ParticipantsService.getMyParticipantParticipantMeGet(),
        queryKey: ['getParticipants'],
    });
}

export const useGetParticipantTournaments = (id: number) => {
    return useQuery({
        queryFn: () => ParticipantsService.getMyParticipantParticipantGetTournaments({participantId: id}),
        queryKey: ['getParticipantsTournaments', id],
    });
}