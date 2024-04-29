import { Tournament } from '../../components/elements';
export const mockData: Tournament[] = [
    { 
        id: 1,
        name: 'NY nba', 
        sport: 'Basketball', 
        category: 'Amateur-Regional', 
        sex: 'Male', 
        ageGroup: ['u18', 'u20'], 
        startDate: '01-01-2024', 
        endDate: '01-02-2024', 
        fees: 50, 
        location: 'New York', 
        description: 'Basketball tournament in New York' 
    },
    { 
        id: 2,
        name: 'PSG tour', 
        sport: 'Football', 
        category: 'Professional', 
        sex: 'Female', 
        ageGroup: ['over 18'], 
        startDate: '02-01-2024', 
        endDate: '02-02-2024', 
        fees: 40, 
        location: 'Paris', 
        description: 'Football tournament in Paris' 
    },
    { 
        id: 3,
        name: 'Baseball trials', 
        sport: 'Baseball', 
        category: 'Amateur-District', 
        sex: 'Mixed', 
        ageGroup: ['u20'], 
        startDate: '01-03-2024', 
        endDate: '01-07-2024', 
        fees: 60, 
        location: 'Chicago', 
        description: 'Baseball tournament in Chicago' 
    },
    { 
        id: 4,
        name: 'OM challenge', 
        sport: 'Football', 
        category: 'Amateur-National', 
        sex: 'Mixed', 
        ageGroup: ['over 18'], 
        startDate: '06-21-2024', 
        endDate: '06-28-2024', 
        fees: 70, 
        location: 'Marseille', 
        description: 'Football tournament in Marseille, Football tournament in Marseille, Football tournament in Marseille, Football tournament in Marseille' 
    },
    // Add more data items as needed
];