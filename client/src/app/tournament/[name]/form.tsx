import React, { use, useState } from 'react';
import { Tournament } from '@/client';
import './form.css';
import { useFillTournament } from '@/app/services/tournaments.service';

// TODO: register who's participating to the tournament
const ParticipateForm: React.FC<{ tournament: Tournament }> = ({ tournament }) => {
    const {mutate: fillTournament} = useFillTournament();
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Perform form submission logic here
        if ("Notification" in window) {
            if (Notification.permission === "granted") {
                new Notification("Participate", {
                    body: "Message sent to the organizer of " + tournament.name + ".",
                });
            } else if (Notification.permission !== "denied") {
                Notification.requestPermission().then((permission) => {
                    if (permission === "granted") {
                        new Notification("Participate", {
                            body: "Message sent to the organizer of " + tournament.name + "."
                        });
                    }
                });
            }
        }
        fillTournament(tournament.id);
    };
    const handleContactOrganizer = () => {
        // Perform contact organizer logic here
        window.open(`mailto:sgardflorian@gmail.com?subject=Partipate to ${tournament.name}-RoadPlay`);    
    };

    // TODO: Get organizer from db, get email and Name from the registration.

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <br />
                <div>
                    <button type='button' onClick={handleContactOrganizer}>Contact Organizer</button>
                    <button type="submit">Participate to {tournament.name}</button>
                </div>
            </form>
            <br />
        </div>
    );
};

export default ParticipateForm;