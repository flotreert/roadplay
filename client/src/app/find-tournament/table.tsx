import React, { useEffect, useState } from 'react';
import { Tournament } from '../../client/types/tournaments';
import { useGetTournaments } from '../services/tournaments.service';
import FeesSelector from './feesSelector';
import './table.css';
import './tags.css';
import { compileFunction } from 'vm';
interface Filter {
    key: string;
    value: any[];
}

const filterData = (data: Tournament[], filter: Filter) => {
    return data.filter(item => {
        switch (filter.key) {
            case 'fees':
                console.log('fees', filter.value[0], filter.value[1])
                return (item.fees >= filter.value[0] && item.fees <= filter.value[1]);
            case 'sport':
                return filter.value.includes(item.sport) || filter.value.length === 0;
            case 'ages':
                return filter.value.some((age: string) => item.age_group.includes(age)) || filter.value.length === 0;
            case 'name':
                return item.name.toLowerCase().includes(String(filter.value).toLowerCase()) || filter.value.length === 0;
            case 'location':
                return item.location.toLowerCase().includes(String(filter.value).toLowerCase()) || filter.value.length === 0;
            case 'category':
                return String(filter.value).toLowerCase().includes(item.category.toLowerCase()) || filter.value.length === 0;
            case 'start_date':
                return item.start_date >= filter.value[0] || filter.value.length === 0;
            case 'end_date':
                return item.end_date <= filter.value[0] || filter.value.length === 0;
            case 'sex':
                return filter.value.some((sex: string) => item.sex.includes(sex)) || filter.value.length === 0; 
            

        }
    });
};

const multiFilterData = (data: Tournament[], filters: Filter[]) => {
    return filters.reduce((acc, filter) => {
        return filterData(acc, filter);
    }
    , data 
);
}


const columns = {
    name: 'Name',
    start_date: 'Start Date',
    location: 'Location',
    fees: 'Fees',
    number_of_teams: 'Teams',
} 

const TournamentTable: React.FC = () => {
    const { data: allData } = useGetTournaments();
    
    const [data, setData] = useState(allData);
    const [location, setLocation] = useState('');
    const [name, setName] = useState('');
    const [sortKey, setSortKey] = useState('');
    const sports = ['Football', 'Basketball', 'Tennis', 'Volleyball'];
    //TODO: Use range and union range
    const allAges = ['Under 10', '10-12', '13-15', '16-18', 'Over 18'];
    const allSex = ['Male', 'Female', 'Mixed'];
    const allCategory = ['Professional', 'Amateur-National', 'Amateur-Regional', 'Amateur-District', 'Beginner'];
    const filterOptions = ['Name', 'Location'];
    const [filterOption, setFilterOption] = useState(filterOptions[0]);
    const [selectedFilters, setSelectedFilters] = useState<Filter[]>([{key: 'fees', value: [0, 1000]}]);
    const [openFilter, setOpenFilter] = useState(false);
    

    useEffect(() => {
        setData(allData);
    }, [allData]);


    const handleFilterChange = (name: string, value: any) => {
        const updatedFilters = [...selectedFilters];
        const index = updatedFilters.findIndex(filter => filter.key === name);
        if (index == -1){
            updatedFilters.push({key: name, value: [value]});
            setSelectedFilters(updatedFilters);
            const filteredData = multiFilterData(allData || [], updatedFilters);
            setData(filteredData);
            return
        }
        
        // TODO: Refactor this
        if (name === 'name' || name === 'location' || name === 'start_date' || name === 'end_date') {
            updatedFilters[index].value = [value];
        } else if (name === 'fees'){
            updatedFilters[index].value = value
        } else if (updatedFilters[index].value.includes(value)) {
            updatedFilters[index].value = updatedFilters[index].value.filter(item => item !== value);
        } else {
            updatedFilters[index].value.push(value);
        }
        setSelectedFilters(updatedFilters);
        const filteredData = multiFilterData(allData || [], updatedFilters);
        console.log('===', updatedFilters)
        setData(filteredData);
    };


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

    const handleTournamentClick = (item: Tournament) => {
        // TODO: isLoading 
        window.location.href = `/tournament/${item.id}`;
    };
    
    const filterSports = selectedFilters.find(filter => filter.key === 'sport')?.value || [];
    const filterages = selectedFilters.find(filter => filter.key === 'ages')?.value || [];
    const filtersex = selectedFilters.find(filter => filter.key === 'sex')?.value || [];
    const filtercategory = selectedFilters.find(filter => filter.key === 'category')?.value || [];

    return (
        <div>
            <button className='filter-button' onClick={() => setOpenFilter(!openFilter)}>Filter</button>
            <div className='grid-container'>
                {openFilter && (
                    <div className='grid-item-filter'>
                        <div>
                            <h4>Sport.s</h4>
                            <ul>
                                {sports.map((sport) => (
                                    <button 
                                        key={sport}
                                        onClick={() => handleFilterChange('sport', sport)}
                                        style={{ cursor: 'pointer' }}
                                        className={filterSports.includes(sport) ? 'tagActive' : 'tag'}
                                    >
                                        {sport}
                                    </button>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4>Dates</h4>
                            <div style={{display: 'flex', flexDirection:'row', alignItems: 'center'}}>
                                <label>From </label>
                                <input
                                    type="date"
                                    value={selectedFilters.find(filter => filter.key === 'start_date')?.value || ''}
                                    onChange={e => handleFilterChange('start_date', e.target.value)}
                                />
                                <label>to</label>
                                <input
                                    type="date"
                                    value={selectedFilters.find(filter => filter.key === 'end_date')?.value || ''}
                                    onChange={e => handleFilterChange('end_date', e.target.value)}
                                />
                            </div>
                        </div>
                        <h4>Location</h4>
                        <div className='filter'>
                            <input
                                type="text"
                                className='filter-input'
                                placeholder={`Filter by location`}
                                value={location}
                                onChange={e => {
                                    setLocation(e.target.value);
                                    handleFilterChange('location', e.target.value);
                                }}
                                />
                        </div>
                        <h4>Fees</h4>
                        <FeesSelector onSelect={(min: number, max: number) => handleFilterChange('fees', [min, max])} />
                        <div>
                            <h4>Age.s</h4>
                            <ul>
                                {allAges.map((ages: string) => (
                                    <button 
                                        key={ages}
                                        onClick={() => handleFilterChange('ages', ages)}
                                        style={{ cursor: 'pointer' }}
                                        className={filterages.includes(ages) ? 'tagActive' : 'tag'}
                                    >
                                        {ages}
                                    </button>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4>Sex</h4>
                            <ul>
                                {allSex.map((sex: string) => (
                                    <button 
                                        key={sex}
                                        onClick={() => handleFilterChange('sex', sex)}
                                        style={{ cursor: 'pointer' }}
                                        className={filtersex.includes(sex) ? 'tagActive' : 'tag'}
                                    >
                                        {sex}
                                    </button>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4>Category</h4>
                            <ul>
                                {allCategory.map((category: string) => (
                                    <button 
                                        key={category}
                                        onClick={() => handleFilterChange('category', category)}
                                        style={{ cursor: 'pointer' }}
                                        className={filtercategory.includes(category) ? 'tagActive' : 'tag'}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </ul>
                        </div>
                        
                    </div>
                )}
                <div>
                    <div className='filter'>
                        <input
                            type="text"
                            className='search-input'
                            placeholder={`Search by name`}
                            value={name}
                            onChange={e => {
                                setName(e.target.value);
                                handleFilterChange('name', e.target.value);
                            }}
                            style={{maxWidth: '200px'}}
                            />
                        <div className='filter'>
                            <h6>Sort</h6>
                            <button className='sort' onClick={() => handleSort('fees')}>fees</button>
                        </div>
                    </div>
                    <div className='grid-tournament-container'>
                        {data?.map((item, index) => (
                            <div className='grid-tournament-item' key={item.id} onClick={() => handleTournamentClick(item)}>
                                <div className='name'>
                                    {item.name}
                                </div>
                                {Object.entries(item).map(([key, value]) => {
                                    if (key !== 'name' && key in columns) {
                                        return (
                                            <div key={key}>
                                                <h6>{columns[key as keyof typeof columns]}</h6>
                                                {value}
                                            </div>
                                        );
                                    }
                                    return null; // Add this line to handle the case when the key is not in columns
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TournamentTable;