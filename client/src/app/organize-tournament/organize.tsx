'use client';
import React, { useState } from 'react';
import ProgressBar from '../components/progressBar';
import { TournamentDisplay } from '@/client/types/tournaments';
import {useCreateTournament} from '../services/tournaments.service';

import './organize.css';

const sports = ['Football', 'Basketball', 'Tennis', 'Volleyball'];
// TODO: Use range and union range
const ageGroups = ['Under 10', '10-12', '13-15', '16-18', 'Over 18'];
const categories = ['Professional', 'Amateur-National', 'Amateur-Regional', 'Amateur-District', 'Beginner'];
const sexes = ['Male', 'Female', 'Mixed'];




interface FormProps {}

const calculateProgress = (values: TournamentDisplay): number => {
    const { name, sport, sex, age_group, category, start_date, end_date, fees, location, description } = values;
    const totalFields = Object.keys(values).length;
    let filledFields = 0;

    if (name.trim() !== '') filledFields++;
    if (sport.trim() !== '') filledFields++;
    if (sex.trim() !== '') filledFields++;
    if (age_group.length > 0 && age_group[0].trim() !== '') filledFields++;
    if (category.trim() !== '') filledFields++;
    if (start_date.trim() !== '') filledFields++;
    if (end_date.trim() !== '') filledFields++;
    if (fees >= 0) filledFields++;
    if (location.trim() !== '') filledFields++;
    if (description.trim() !== '') filledFields++;
    if (values.number_of_teams > 0) filledFields++;

    return (filledFields / totalFields) * 100;
};


const OrganizeForm: React.FC<FormProps> = () => {
    const [progressValue, setProgressValue] = useState<number>(0);
    //TODO: Change Id from the DB
    const [formValues, setFormValues] = useState<TournamentDisplay>({
        name: '',
        sport: '', 
        sex: '',
        age_group: [''],
        category: '',
        start_date: '',
        end_date: '',
        fees: -1,
        location: '',
        description: '',
        number_of_teams: 0,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        console.log(name, value);
        setFormValues({
            ...formValues,
            [name]: value,
        });
        setProgressValue(calculateProgress({
            ...formValues,
            [name]: value,
        }));
    }
    const handleAddAgeGroup = () => {
        setFormValues({
            ...formValues,
            age_group: [...(formValues.age_group as string[]),''],
        });
    };

    const handleAgeGroupChange = (index: number, value: string) => {
        let updatedAgeGroup = [...(formValues.age_group as string[])];
        //TODO: do it in the select:  Remove empty strings
        if (!updatedAgeGroup.includes(value)) {
            updatedAgeGroup[index] = value;
            setFormValues({
            ...formValues,
            age_group: updatedAgeGroup,
            });
        }
        setProgressValue(calculateProgress({
            ...formValues,
            age_group: updatedAgeGroup,
        }));
        return null;
    };

    const handleRemoveAgeGroup = (index: number) => {
        const updatedAgeGroup = [...(formValues.age_group as string[])];
        updatedAgeGroup.splice(index, 1);
        setFormValues({
            ...formValues,
            age_group: updatedAgeGroup,
        });
    };

    const {mutate: createTournament} = useCreateTournament();

    const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        createTournament(formValues);
    }
    

    // Filter age groups based on selected age groups
    return (
        <div>
            <h1>Organize Tournament</h1>
            <ProgressBar progress={progressValue} />
            <form onSubmit={onSubmit}>
                <label>
                    Name
                    <input type="text" name="name" value={formValues.name} onChange={handleInputChange} required={true} />
                </label>
                <label>
                    Sport
                    <select name='sport' value={formValues.sport} onChange={handleInputChange} required={false}>
                        <option value="" disabled>Select Sport</option>
                        {sports.map((sport) => (
                            <option key={sport} value={sport}>{sport}</option>
                        ))}
                    </select>
                </label>
                <br/>
                <label>
                    Sex
                    <select name='sex' value={formValues.sex} onChange={handleInputChange} required={false}>
                        <option value="" disabled>Select Sex</option>
                        {sexes.map((sex) => (
                            <option key={sex} value={sex}>{sex}</option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Age.s
                {formValues.age_group.map((age_group: string, index: number) => (
                    <div className='parent-ages' key={index}>
                        <div className='ages'>
                            <select name='age' value={age_group} onChange={(e) => handleAgeGroupChange(index, e.target.value)} required={false}>
                                <option value="" disabled>Select Age</option>
                                {ageGroups.map((age) => (
                                    <option key={age} value={age}>{age}</option>
                                ))}
                            </select>
                        </div>
                        {index > 0 && <button onClick={() => handleRemoveAgeGroup(index)}>Remove Age Group</button>}
                    </div>
                ))}
                </label>
                <button className="add-age" type="button" onClick={handleAddAgeGroup}>+</button>
                <br />
                <label>
                    Category
                    <select name='category' value={formValues.category} onChange={handleInputChange} required={false}>
                        <option value="" disabled>Select Category</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Start Date
                    <input 
                        name='start_date' 
                        type="date" 
                        value={formValues.start_date} 
                        onChange={handleInputChange} 
                        required={false} 
                        min={new Date().toISOString().split('T')[0]} />
                </label>
                <br />
                <label>
                    End Date
                    <input
                        name='end_date'
                        type="date"
                        value={formValues.end_date}
                        onChange={handleInputChange}
                        required={false}
                        min={formValues.start_date}
                    />
                </label>
                <br />
                <label>
                    Number of Teams
                    <input name='number_of_teams' type='number' value={formValues.number_of_teams} onChange={handleInputChange} required={false} min={0}/>
                </label>
                <br />
                <label>
                    Fees
                    <input name='fees' type='number' value={formValues.fees} onChange={handleInputChange} required={false} min={0}/>
                </label>
                <br />
                    <label>
                    Location
                    <input type='text' name='location' value={formValues.location} onChange={handleInputChange} required={false} />
                </label>
                <br/>
                <label>
                    Description
                    <textarea name='description' value={formValues.description} onChange={handleInputChange} required={false} />
                </label>
                <br />
                <label className='conditions'>
                    <input className='conditions' type="checkbox" required={false} />
                    I agree to the terms and conditions
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default OrganizeForm;