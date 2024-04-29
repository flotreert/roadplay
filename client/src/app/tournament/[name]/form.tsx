import React, { useState } from 'react';
import { Tournament } from '../../components/types';
import './form.css';

const ParticipateForm: React.FC<{ tournament: Tournament }> = ({ tournament }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

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
        console.log('Form submitted:', tournament.id);
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