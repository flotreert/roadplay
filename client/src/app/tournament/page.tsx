import React from 'react';

const TournamentPage: React.FC = () => {
  const tournaments = [
    { id: 1, name: 'Tournament 1' },
    { id: 2, name: 'Tournament 2' },
    { id: 3, name: 'Tournament 3' },
  ];

  return (
    <div>
      <h1>Tournament List</h1>
      <ul>
        {tournaments.map((tournament) => (
          <li key={tournament.id}>{tournament.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TournamentPage;