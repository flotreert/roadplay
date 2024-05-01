import {useQuery, useMutation, UseMutationOptions} from '@tanstack/react-query';
import {TournamentDisplay} from '@/client';
import { DefaultService } from '@/client';

const actions = {createTournament: ()  => ({
    mutationFn: (data: TournamentDisplay) => DefaultService.createTournamentTournamentsPost({requestBody: data}),
    mutationKey: ['createTournament', 'create'],
    onSuccess: () => {
        console.log('Tournament created successfully');
    },
    onError: (error: any) => {
        window.alert('Error creating tournament' + error);
    }
    }),
    fillTournament: ()  => ({
        mutationFn: (id: number) => DefaultService.fillTournamentTournamentsTournamentIdFillPost({tournamentId: id}),
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
        queryFn: () => DefaultService.getTournamentsTournamentsGet(),
        queryKey: ['getTournaments', 'list'],
    });
}

export const useGetTournament = (id: number) => {
    return useQuery({
        queryFn: () => DefaultService.getTournamentTournamentsTournamentIdGet({tournamentId: id}),
        queryKey: ['getTournament', id],
        refetchInterval(query) {
            return 60;
        },
    });
}

