import React, { useState } from 'react';
import './table.css';
import { Tournament } from '../components/elements';
import { mockData } from './mockData';

const filterData = (data: any[], filterOption: string, filter: string) => {
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
                return item.age.toLowerCase().includes(filter.toLowerCase());
            case 'City':
                return item.city.toLowerCase().includes(filter.toLowerCase());
            case 'Fees':
                return item.fees.toString().includes(filter);
            case 'Location':
                return item.location.toLowerCase().includes(filter.toLowerCase());
            default:
                return true;
        }
    });
};

const DummyTournament: Tournament =     { 
    id: 0,
    name: '', 
    sport: '', 
    category: '', 
    sex: '', 
    ageGroup: [''], 
    startDate: '', 
    endDate: '', 
    fees: 0, 
    location: '', 
    description: '' 
}


// const columns = ['name', 'sport', 'category', 'sex', 'ageGroup', 'startDate', 'endDate', 'fees', 'location', 'description']


const TournamentTable: React.FC = () => {
    const allData = mockData; 
    const [data, setData] = useState(mockData); 
    const [filter, setFilter] = useState('');
    const [sortKey, setSortKey] = useState('');
    
    const filterOptions = ['Name', 'Sport', 'Category', 'Age', 'City', 'Fees', 'Location'];
    const [filterOption, setFilterOption] = useState(filterOptions[0]);


    const handleSort = (key: string) => {
        const sortedData = [...data].sort((a, b) => {
            if (a[key as keyof typeof a] < b[key as keyof typeof b]) return -1;
            if (a[key as keyof typeof a] > b[key as keyof typeof b]) return 1;
            return 0;
        });

        setData(sortedData);
        setSortKey(key);
    };

    const handleFilter = (filter: string) => {
        const filteredData = filterData(allData, filterOption, filter);
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
                            {Object.keys(DummyTournament).map(key => {
                                if (key === 'id') {
                                    return null; // Mask the id column
                                }
                                return (
                                    <th key={key} style={{ backgroundColor: 'lightgray', padding: '8px' }} onClick={() => handleSort(key)}>
                                        <div className='title'>
                                            {key.charAt(0).toUpperCase() + key.slice(1) + '  ▲'}
                                        </div>
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr 
                                key={item.name} 
                                style={{ backgroundColor: index % 2 === 0 ? 'white' : 'lightgray' }} 
                                onClick={() => handleRowClick(item)}
                            >
                                {Object.entries(item).map(([key, value]) => {
                                    if (key === 'id') {
                                        return null; // Mask the id column
                                    }
                                    return (
                                        <td key={value} className='row'>
                                            {Array.isArray(value) ? value.join(', ') : value}
                                        </td>
                                    );
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