import {useQuery, useMutation, UseMutationOptions} from '@tanstack/react-query';
import { TournamentDisplay } from '@/client/types/tournaments';
import { TournamentsService } from '@/client';

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
        mutationFn: (id: number) => TournamentsService.fillTournamentTournamentsTournamentIdFillPost({tournamentId: id}),
        mutationKey: ['fillTournament', 'fill'],
        onSuccess: () => {
            console.log('Tournament filled successfully');
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
        refetchInterval(query) {
            return 60;
        },
    });
}

