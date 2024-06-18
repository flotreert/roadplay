import { Tournament } from '../../client/types/tournaments';

export const calculateFilling = (tournament: Tournament) => {
    return Math.floor(tournament.participants.length / tournament.number_of_teams * 100);
};

export const isDateLessThan10Days = (date: string): boolean => {
    const currentDate = new Date();
    const tournamentDate = new Date(date);
    const differenceInTime = tournamentDate.getTime() - currentDate.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays < 15;
};