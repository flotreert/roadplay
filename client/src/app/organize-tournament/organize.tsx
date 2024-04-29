'use client';
import React, { useState } from 'react';
import ProgressBar from '../components/progressBar';
import { Tournament } from '../components/elements';
import './organize.css';

const sports = ['Football', 'Basketball', 'Tennis', 'Volleyball'];
const ageGroups = ['Under 10', '10-12', '13-15', '16-18', 'Over 18'];
const categories = ['Professional', 'Amateur-National', 'Amateur-Regional', 'Amateur-District', 'Beginner'];
const sexes = ['Male', 'Female', 'Mixed'];




interface FormProps {
    onSubmit: (data: Tournament) => void;
  }

const calculateProgress = (values: Tournament): number => {
    const { name, sport, sex, ageGroup, category, startDate, endDate, fees, location, description } = values;
    const totalFields = Object.keys(values).length;
    let filledFields = 0;

    if (name.trim() !== '') filledFields++;
    if (sport.trim() !== '') filledFields++;
    if (sex.trim() !== '') filledFields++;
    if (ageGroup.length > 0 && ageGroup[0].trim() !== '') filledFields++;
    if (category.trim() !== '') filledFields++;
    if (startDate.trim() !== '') filledFields++;
    if (endDate.trim() !== '') filledFields++;
    if (fees > 0) filledFields++;
    if (location.trim() !== '') filledFields++;
    if (description.trim() !== '') filledFields++;

    return (filledFields / totalFields) * 100;
};


const OrganizeForm: React.FC<FormProps> = ({onSubmit}) => {
    const [progressValue, setProgressValue] = useState<number>(0);
    //TODO: Change Id from the DB
    const [formValues, setFormValues] = useState<Tournament>({
        id: 0,
        name: '',
        sport: '', 
        sex: '',
        ageGroup: [''],
        category: '',
        startDate: '',
        endDate: '',
        fees: 0,
        location: '',
        description: '',
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
            ageGroup: [...(formValues.ageGroup as string[]),''],
        });
    };

    const handleAgeGroupChange = (index: number, value: string) => {
        let updatedAgeGroup = [...(formValues.ageGroup as string[])];
        //TODO: do it in the select:  Remove empty strings
        if (!updatedAgeGroup.includes(value)) {
            updatedAgeGroup[index] = value;
            setFormValues({
            ...formValues,
            ageGroup: updatedAgeGroup,
            });
        }
        setProgressValue(calculateProgress({
            ...formValues,
            ageGroup: updatedAgeGroup,
        }));
        return null;
    };

    const handleRemoveAgeGroup = (index: number) => {
        const updatedAgeGroup = [...(formValues.ageGroup as string[])];
        updatedAgeGroup.splice(index, 1);
        setFormValues({
            ...formValues,
            ageGroup: updatedAgeGroup,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formValues);
    }


    // Filter age groups based on selected age groups
    return (
        <div>
            <h1>Organize Tournament</h1>
            <ProgressBar progress={progressValue} />
            <form onSubmit={handleSubmit}>
                <label>
                    Name
                    <input type="text" name="name" value={formValues.name} onChange={handleInputChange} required={true} />
                </label>
                <label>
                    Sport
                    <select name='sport' value={formValues.sport} onChange={handleInputChange} required={true}>
                        <option value="" disabled>Select Sport</option>
                        {sports.map((sport) => (
                            <option key={sport} value={sport}>{sport}</option>
                        ))}
                    </select>
                </label>
                <br/>
                <label>
                    Sex
                    <select name='sex' value={formValues.sex} onChange={handleInputChange} required={true}>
                        <option value="" disabled>Select Sex</option>
                        {sexes.map((sex) => (
                            <option key={sex} value={sex}>{sex}</option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Age.s
                 {formValues.ageGroup.map((ageGroup, index) => (
                    <div className = 'parent-ages' key={index}>
                        <div className='ages'>
                            <select name='age' value={ageGroup} onChange={(e) => handleAgeGroupChange(index, e.target.value)} required={true}>
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
                    <select name='category' value={formValues.category} onChange={handleInputChange} required={true}>
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
                        name='startDate' 
                        type="date" 
                        value={formValues.startDate} 
                        onChange={handleInputChange} 
                        required={true} 
                        min={new Date().toISOString().split('T')[0]} />
                </label>
                <br />
                <label>
                    End Date
                    <input
                        name='endDate'
                        type="date"
                        value={formValues.endDate}
                        onChange={handleInputChange}
                        required={true}
                        min={formValues.startDate}
                    />
                </label>
                <br />
                <label>
                    Fees
                    <input name='fees' type='number' value={formValues.fees} onChange={handleInputChange} required={true} min={0}/>
                </label>
                <br />
                    <label>
                    Location
                    <input type='text' name='location' value={formValues.location} onChange={handleInputChange} required={true} />
                </label>
                <br/>
                <label>
                    Description
                    <textarea name='description' value={formValues.description} onChange={handleInputChange} required={true} />
                </label>
                <br />
                <label className='conditions'>
                    <input className='conditions' type="checkbox" required={true} />
                    I agree to the terms and conditions
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default OrganizeForm;