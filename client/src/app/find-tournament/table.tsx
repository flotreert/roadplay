import React, { useState } from 'react';
import './table.css';
import { Tournament } from '@/client';
import { useGetTournaments } from '../services/tournaments.service';

const filterData = (data: Tournament[], filterOption: string, filter: string) => {
    return data.filter(item => {
        // Filter logic based on selected filter option
        switch (filterOption) {
            case 'Name':
                return item.name.toLowerCase().includes(filter.toLowerCase());
            case 'Sport':
                return item.sport.toLowerCase().includes(filter.toLowerCase());
            case 'Category':
                return item.category.toLowerCase().includes(filter.toLowerCase());
            case 'Sex':
                return item.sex.toLowerCase().includes(filter.toLowerCase());
            case 'Age':
                return item.age_group.join(', ').toLowerCase().includes(filter.toLowerCase());
            case 'Fees':
                return item.fees.toString().includes(filter);
            case 'Location':
                return item.location.toLowerCase().includes(filter.toLowerCase());
            default:
                return true;
        }
    });
};

const columns = {
    name: 'Name',
    sex: 'Sex',
    start_date: 'Start Date',
    end_date: 'End Date',
    location: 'Location',
    sport: 'Sport',
    age_group: 'Age.s',
    category: 'Category',
    fees: 'Fees',
    number_of_teams: 'Teams',
    description: 'Description',
}

const TournamentTable: React.FC = () => {
    const {data: allData} = useGetTournaments();
    const [data, setData] = useState(allData); 
    const [filter, setFilter] = useState('');
    const [sortKey, setSortKey] = useState('');
    
    const filterOptions = ['Name', 'Sport', 'Category', 'Age', 'City', 'Fees', 'Location'];
    const [filterOption, setFilterOption] = useState(filterOptions[0]);

    const handleSort = (key: string) => {
        const sortedData = data?.sort((a, b) => {
            if (sortKey === key) {
                return a[key as keyof Tournament] && b[key as keyof Tournament] ? a[key as keyof Tournament]! > b[key as keyof Tournament]! ? -1 : 1 : 0;
            }
            return a[key as keyof Tournament] && b[key as keyof Tournament] ? a[key as keyof Tournament]! > b[key as keyof Tournament]! ? 1 : -1 : 0;
        });
        setData(sortedData);
        console.log('sortedData', sortedData)
        setSortKey(key);
    };

    const handleFilter = (filter: string) => {
        const filteredData = filterData(allData || [], filterOption, filter);
        setData(filteredData);
        setFilter(filter);
    };


    const handleRowClick = (item: Tournament) => {
        window.location.href = `/tournament/${item.id}`;
    };

    return (
        <div>
            <div className='filter'>
                <select className='select-filter' value={filterOption} onChange={e => setFilterOption(e.target.value)}>
                    {filterOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
                <input
                    type="text"
                    className='filter-input'
                    placeholder={`Filter by ${filterOption.toLowerCase()}`}
                    value={filter}
                    onChange={e => handleFilter(e.target.value)}
                />
            </div>
            <div className='table-container'>
                <table>
                    <thead>
                        <tr>
                            {Object.entries(columns).map(([key, value]) => {
                                return (
                                    <th key={key} style={{ backgroundColor: 'lightgray', padding: '8px' }} onClick={() => handleSort(key)}>
                                        <div className='title'>
                                            {value + '  ▲'}
                                        </div>
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {allData?.map((item, index) => (
                            <tr 
                                key={item.id} 
                                style={{ backgroundColor: index % 2 === 0 ? 'white' : 'lightgray' }} 
                                onClick={() => handleRowClick(item)}
                            >
                                {Object.entries(item).map(([key, value]) => {
                                    if (key in columns) {
                                        return (
                                            <td key={String(value)} className='row'>
                                                {Array.isArray(value) ? value.join(', ') : value}
                                            </td>
                                        );
                                    }
                                    return null;
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TournamentTable;