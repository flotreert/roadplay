import React, { useEffect, useState } from 'react';
import './table.css';
import { Tournament } from '../../client/types/tournaments';
import { useGetTournaments } from '../services/tournaments.service';
import SportTag from './sportTag';
import feesSelector from './feesSelector';
import FeesSelector from './feesSelector';


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
    age_group: 'Age.s',
    category: 'Category',
    fees: 'Fees',
    number_of_teams: 'Teams',
    description: 'Description',
} 

const TournamentTable: React.FC = () => {
    const { data: allData } = useGetTournaments();
    
    const [data, setData] = useState(allData);
    const [filter, setFilter] = useState('');
    const [sortKey, setSortKey] = useState('');
    const sports = ['Football', 'Basketball', 'Tennis', 'Volleyball'];
    const filterOptions = ['Name', 'Category', 'Age', 'City', 'Location'];
    const [filterOption, setFilterOption] = useState(filterOptions[0]);
    const [openFilter, setOpenFilter] = useState(false);
    

    useEffect(() => {
        setData(allData);
    }, [allData]);


    const handleSort = (key: string) => {
        const sortedData = allData?.sort((a, b) => {
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
    
    const handleSportFilter = (selectedSport: string) => {
        if (selectedSport === '') {
            setData(allData);
            return;
        }
        const filteredData = allData?.filter(item => item.sport === selectedSport);
        setData(filteredData);
    }
    
    const handleFeesFilter = (min: number, max: number) => {
        const filteredData = allData?.filter(item => item.fees >= min && item.fees <= max);
        setData(filteredData);
    }

    const handleRowClick = (item: Tournament) => {
        // TODO: isLoading 
        window.location.href = `/tournament/${item.id}`;
    };
    
    return (
        <div>
        <button onClick={() => setOpenFilter(!openFilter)}>Filter</button>
        <div className='grid'>
            {openFilter && (
                <div className='grid-item'>
            <SportTag sports={sports} onSelect={(selectedSport: any) => handleSportFilter(selectedSport)} />
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
            <FeesSelector onSelect={handleFeesFilter} />
            </div>
                )}
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
                        {data?.map((item, index) => (
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
        </div>
    );
};

export default TournamentTable;