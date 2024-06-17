import React, { useCallback, useEffect, useState } from 'react';
import { Tournament } from '../../client/types/tournaments';
import { useGetTournaments } from '../services/tournaments.service';
import FeesSelector from './feesSelector';
import MultiRangeSlider from '../components/doubleSlider';
import TournamentList from './tournament';
import './table.css';
import '../components/tags.css';
interface Filter {
    key: string;
    value: any[];
}

const filterData = (data: Tournament[], filter: Filter) => {
    return data.filter(item => {
        switch (filter.key) {
            case 'fees':
                return (item.fees >= filter.value[0] && item.fees <= filter.value[1]);
            case 'sport':
                return filter.value.includes(item.sport) || filter.value.length === 0;
            case 'ages':
                return (item.age_group[0] >= filter.value[0] && item.age_group[0] <= filter.value[1]) 
                        || (item.age_group[1] <= filter.value[1] && item.age_group[1] >= filter.value[0]) ;
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


const TournamentTable: React.FC = () => {
    const { data: allData } = useGetTournaments();
    
    const [data, setData] = useState(allData);
    const [location, setLocation] = useState('');
    const [name, setName] = useState('');
    const [sortAscending, setSortAscending] = useState(false);
    const sports = ['Football', 'Basketball', 'Tennis', 'Volleyball'];
    const allSex = ['Male', 'Female', 'Mixed'];
    const allCategory = ['Professional', 'Amateur-National', 'Amateur-Regional', 'Amateur-District', 'Beginner'];
    const [selectedFilters, setSelectedFilters] = useState<Filter[]>([{key: 'fees', value: [0, 1000]}, {key: 'ages', value: [0, 100]}]);
    const [openFilter, setOpenFilter] = useState(true);
    

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
        }else if (name === 'ages'){
            updatedFilters[index].value = Object.values(value);
        }else if (name === 'fees'){
            updatedFilters[index].value = value
        } else if (updatedFilters[index].value.includes(value)) {
            updatedFilters[index].value = updatedFilters[index].value.filter(item => item !== value);
        } else {
            updatedFilters[index].value.push(value);
        }
        setSelectedFilters(updatedFilters);
        const filteredData = multiFilterData(allData || [], updatedFilters);
        setData(filteredData);
    };

    const handleFeeSort = () => {
        const sortedData = allData?.sort((a, b) => {
            if (sortAscending) {
                return a.fees && b.fees ? a.fees! > b.fees! ? -1 : 1 : 0;
            }
            return a.fees && b.fees ? a.fees! > b.fees! ? 1 : -1 : 0;
        });
        setData(sortedData);
        setSortAscending(!sortAscending);
    };

    const handleTournamentClick = (item: Tournament) => {
        // TODO: isLoading 
        window.location.href = `/tournament/${item.id}`;
    };
    
    const filterSports = selectedFilters.find(filter => filter.key === 'sport')?.value || [];
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
                                        style={{ cursor: 'pointer', '--dynamic-color': '#a316fba2'} as React.CSSProperties}
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
                        <div className='ages'>
                            <h4>Age.s</h4>
                            <div style={{margin:'10px'}}>
                            <MultiRangeSlider
                                min={0}
                                max={100}
                                onChange={(values: number[]) => handleFilterChange('ages', values)}
                                />
                            </div>
                        </div>
                        <div>
                            <h4>Sex</h4>
                            <ul>
                                {allSex.map((sex: string) => (
                                    <button 
                                        key={sex}
                                        onClick={() => handleFilterChange('sex', sex)}
                                        style={{ cursor: 'pointer', '--dynamic-color': '#69ddf5' } as React.CSSProperties}
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
                                        style={{ cursor: 'pointer', '--dynamic-color': '#6977f5' } as React.CSSProperties}
                                        className={filtercategory.includes(category) ? 'tagActive' : 'tag'}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </ul>
                        </div>
                        
                    </div>
                )}
                <div style={{minWidth:'700px'}}>
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
                            <button className='sort' onClick={handleFeeSort}>fees</button>
                        </div>
                    </div>
                    <TournamentList tournaments={data || []} onClick={handleTournamentClick}/>
                </div>
            </div>
        </div>
    );
};

export default TournamentTable;