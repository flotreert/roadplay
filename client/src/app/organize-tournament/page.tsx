'use client';
import React from 'react';
import OrganizeForm from './organize';
import { DefaultService, TournamentCreate } from '@/client';

const Page: React.FC = () => {

    // async function handleSubmit(data: TournamentCreate){
    //     const resp = await DefaultService.createTournamentTournamentsPost({requestBody: data})
    //     console.log(resp);
        
    // }

    return (
        <main>
            <OrganizeForm/>
        </main>
    );
};

export default Page;