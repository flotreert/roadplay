'use client';
import React from 'react';
import OrganizeForm from './organize';
import { Tournament } from './organize';

const Page: React.FC = () => {

    function handleSubmit(data: Tournament){
        window.alert('MOCKER send to the database' + JSON.stringify(data, null, 2));
    }

    return (
        <main>
            <OrganizeForm onSubmit={handleSubmit}/>
        </main>
    );
};

export default Page;