'use client';
import React, { useState } from 'react';
import ProgressBar from '../components/progressBar';
import MultiRangeSlider from '../components/doubleSlider';
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
    const totalFields = Object.keys(values).length;
    let filledFields = 0;
    console.log(values);
    if (values.name.trim() !== '') filledFields++;
    if (values.sport.trim() !== '') filledFields++;
    if (values.sex.trim() !== '') filledFields++;
    if (values.age_group[0] != 0 && values.age_group[1] != 100) filledFields++;
    if (values.category.trim() !== '') filledFields++;
    if (values.start_date.trim() !== '') filledFields++;
    if (values.end_date.trim() !== '') filledFields++;
    if (values.fees >= 0) filledFields++;
    if (values.location.trim() !== '') filledFields++;
    if (values.description.trim() !== '') filledFields++;
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
        age_group: [0, 100],
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
        setFormValues({
            ...formValues,
            [name]: value,
        });
        setProgressValue(calculateProgress({
            ...formValues,
            [name]: value,
        }));
    }

    const {mutate: createTournament} = useCreateTournament();

    const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        createTournament(formValues);
    }

    const handleOnChangeAge = (values: any) => {
        console.log(values);
        setProgressValue(calculateProgress({
            ...formValues,
            age_group: [values.min, values.max],
        }));
        setFormValues({
            ...formValues,
            age_group: [values.min, values.max],
        });
        
    }
    //TODO: Add tags for sports, sex and category(maybe a range with the levels of the category)
    return (
        <div className='grid-container'>
            <ProgressBar progress={progressValue} />
            <div className='form'>
                <form onSubmit={onSubmit}>
                    <label>
                        Name
                        <div className='inputs-form'>
                            <input type="text" name="name" value={formValues.name} onChange={handleInputChange} required={true} />
                        </div>
                    </label>
                    <br/>
                    <label>
                        Sport
                        <div className='inputs-form'>
                            <select name='sport' value={formValues.sport} onChange={handleInputChange} required={false}>
                                <option value="" disabled>Select Sport</option>
                                {sports.map((sport) => (
                                    <option key={sport} value={sport}>{sport}</option>
                                ))}
                            </select>
                        </div>
                    </label>
                    <label>
                        Sport
                        <div className='inputs-form'>
                        </div>
                    </label>
                    <br/>
                    <label>
                        Sex
                        <div className='inputs-form'>
                        <select name='sex' value={formValues.sex} onChange={handleInputChange} required={false}>
                            <option value="" disabled>Select Sex</option>
                            {sexes.map((sex) => (
                                <option key={sex} value={sex}>{sex}</option>
                            ))}
                        </select>
                        </div>
                    </label>
                    <br />
                    <label>
                        Age.s
                            <div className='ages'>
                            <MultiRangeSlider
                                min={0}
                                max={100}
                                onChange={(values: number[]) => handleOnChangeAge(values) }
                                />
                            </div>
                    </label>
                    <br />
                    <label>
                        Category
                        <div className='inputs-form'>
                            <select name='category' value={formValues.category} onChange={handleInputChange} required={false}>
                                <option value="" disabled>Select Category</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                    </label>
                    <br />
                    <label>
                        Start Date
                        <div className='inputs-form'>
                            <input 
                                name='start_date' 
                                type="date" 
                                value={formValues.start_date} 
                                onChange={handleInputChange} 
                                required={false} 
                                min={new Date().toISOString().split('T')[0]} />
                        </div>
                    </label>
                    <br />
                    <label>
                        End Date
                        <div className='inputs-form'>
                            <input
                                name='end_date'
                                type="date"
                                value={formValues.end_date}
                                onChange={handleInputChange}
                                required={false}
                                min={formValues.start_date}
                                />
                        </div>
                    </label>
                    <br />
                    <label>
                        Number of Teams
                        <div className='inputs-form'>
                            <input className='number-slider'
                                    name='number_of_teams'  
                                    type='range' 
                                    min={0} max={299} value={formValues.number_of_teams} 
                                    onChange={handleInputChange} required={false}/>
                            <input name='fees' type='number' 
                                   className='hidden-input' value={formValues.number_of_teams} 
                                   onChange={handleInputChange} required={false} min={0} max={299}/>
                        </div>
                    </label>
                    <br />
                    <label>
                        Fees
                        <div className='inputs-form'>
                            <input className='number-slider'
                                    name='fees'  
                                    type='range' 
                                    min={0} max={1000} value={formValues.fees} 
                                    onChange={handleInputChange} required={false}/>
                            <input name='fees' type='number' 
                                   className='hidden-input' value={formValues.fees} 
                                   onChange={handleInputChange} required={false} min={0} max={299}/>

                        </div>
                    </label>
                    <br />
                        <label>
                        Location
                        <div className='inputs-form'>
                            <input type='text' name='location' value={formValues.location} onChange={handleInputChange} required={false} />
                        </div>
                    </label>
                    <br/>
                    <label>
                        Description
                        <div className='inputs-form'>
                            <textarea name='description' value={formValues.description} onChange={handleInputChange} required={false} />
                        </div>
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
        </div>
                            
    );
};

export default OrganizeForm;