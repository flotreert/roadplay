'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import ParticipationTournaments from './tournaments';


const Page: React.FC = () => {
    const route = usePathname();
    const routeParts = route.split('/');
    const id = Number(routeParts[routeParts.length - 1]); // Convert id to number

    return (
        <main>
            <h1> User page</h1>
            <div>
                <h3>User profile</h3>
                <div>
                    <p>Username: user</p>
                    <p>Photo</p>
                </div>
            </div>
            <div>
                <ParticipationTournaments user_id={id}/>
            </div>
        </main>
    );
};


export default Page;