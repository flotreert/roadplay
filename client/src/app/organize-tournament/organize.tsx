'use client';
import React, { useState } from 'react';
import Image from "next/image";
import ProgressBar from '../components/progressBar';
import MultiRangeSlider from '../components/doubleSlider';
import { TournamentDisplay } from '@/client/types/tournaments';
import {useCreateTournament} from '../services/tournaments.service';

import './organize.css';
import '../components/tags.css';

const sports = ['Football', 'Basketball', 'Tennis', 'Volleyball'];
// TODO: Use range and union range
const categories = ['Professional', 'Amateur-National', 'Amateur-Regional', 'Amateur-District', 'Beginner'];
const sexes = ['Female', 'Male', 'Mixed'];



interface FormProps {}

const calculateProgress = (values: TournamentDisplay): number => {
    const totalFields = Object.keys(values).length;
    let filledFields = 0;
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

    return (filledFields / (totalFields-1)) * 100;
};


function convertDataURIToBinary(dataURI: any) {
        var base64Index = dataURI.indexOf(';base64,') + ';base64,'.length;
        var base64 = dataURI.substring(base64Index);
        var raw = window.atob(base64);
        var rawLength = raw.length;
        var array = new Uint8Array(new ArrayBuffer(rawLength));
    
        for(let i = 0; i < rawLength; i++) {
            array[i] = raw.charCodeAt(i);
        }
        return array;
    }

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
    // TODO: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | HTMLButtonElement>
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | any) => {
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
        createTournament(formValues)
        
    }

    const handleOnChangeAge = (values: any) => {
        setProgressValue(calculateProgress({
            ...formValues,
            age_group: [values.min, values.max],
        }));
        setFormValues({
            ...formValues,
            age_group: [values.min, values.max],
        });
        
    }


    const [file, setFile] = useState<File | null>(null);
    const handleOnChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileInput = document?.querySelector('input[type=file]') as HTMLInputElement;
        const file = fileInput?.files?.[0];
        setFile(file || null);
        const reader = new FileReader();
        let byteArray;
        reader.addEventListener("loadend", function () {
            // convert image file to base64 string
            byteArray = convertDataURIToBinary(reader.result as string);
            if (reader.result){
                setFormValues({
                    ...formValues,
                    images: [reader.result],
                });
            }
        }, false);
        if (file) {
            reader.readAsDataURL(file);
        }
        
        
    }

    // TODO: Replace by images
    const imageSports: {[key: string]: string} = {
        'Football': '/football.png',
        'Basketball': '/basketball.png',
        'Tennis': '/tennis.png',
        'Volleyball': '/volleyball.png',
    }

    const colorsSports: {[key: string]: string} = {
        'Football': '#3a8437',
        'Basketball': '#b47a05',
        'Tennis': '#91b803',
        'Volleyball': '#59c1ed',
    }

    //TODO: ?maybe do a input range with steps of level
    const colorsCategory: {[key: string]: string} = {
        'Professional': '#5160f4',
        'Amateur-National': '#144a13',
        'Amateur-Regional': '#1f730a',
        'Amateur-District': '#207909',
        'Beginner': '#afb016',
    }
    console.log(formValues)
    return (
        <div className='grid-container'>
            <ProgressBar progress={progressValue} />
            <div className='form'>
                <form onSubmit={onSubmit}>
                    <label>
                        Name
                        <div className='inputs-form'>
                            <input type="text" name="name" value={formValues.name} onChange={handleInputChange} required={false} />
                        </div>
                    </label>
                    <br/>
                    <label>
                        Sport
                        <div className='inputs-form-line'>
                            <ul>
                                {sports.map((sport) => (
                                    <button 
                                        key={sport}
                                        type='button'
                                        value={sport}
                                        onClick={() => handleInputChange({target: {name: 'sport', value: sport}} as unknown)}
                                        style={{ cursor: 'pointer', '--dynamic-color': colorsSports[sport]} as React.CSSProperties}
                                        className={formValues.sport === sport ? 'sport-button-validate' : 'sport-button'}
                                    >
                                        <Image src={imageSports[sport]} alt={sport} width={45} height={45} />
                                    </button>
                                ))}
                            </ul>
                        </div>
                    </label>
                    <br/>
                    <label>
                        Sex
                        <div className='inputs-form'>
                            <ul>
                                {sexes.map((sex) => (
                                    <button 
                                        key={sex}
                                        type='button'
                                        value={sex}
                                        onClick={() => handleInputChange({target: {name: 'sex', value: sex}} as unknown)}
                                        style={{ cursor: 'pointer', '--dynamic-color': '#664dab'} as React.CSSProperties}
                                        className={formValues.sex === sex ? 'tagActive' : 'tag'}
                                    >
                                        {sex}
                                    </button>
                                ))}
                            </ul>
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
                            
                                {categories.map((category) => (
                                    <button 
                                        key={category}
                                        type='button'
                                        value={category}
                                        onClick={() => handleInputChange({target: {name: 'category', value: category}} as unknown)}
                                        style={{ cursor: 'pointer', '--dynamic-color': colorsCategory[category]} as React.CSSProperties}
                                        className={formValues.category === category ? 'tagActive' : 'tag'}
                                    >
                                        {category}
                                    </button>
                                ))}
                            
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
                            <input name='number_of_teams' type='number' 
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
                                    min={0} max={500} value={formValues.fees} 
                                    onChange={handleInputChange} required={false}/>
                            <input name='fees' type='number' 
                                   className='hidden-input' value={formValues.fees} 
                                   onChange={handleInputChange} required={false} min={0} max={1000}/>

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
                    <label>
                        Image
                        <div className='inputs-form'>
                            <div className='custom-file-button'>
                                <label htmlFor="inputGroupFile" className='upload'>+</label>
                                <input type="file" name="images" accept=".jpg, .png" onChange={handleOnChangeImage} id="inputGroupFile"/>
                            </div>
                            <section>
                                {file && (
                                    <div>
                                        <Image src={URL.createObjectURL(file)} alt="Selected" width={150} height={150}/>
                                    </div>
                                )}
                            </section>

                        </div>
                    </label>
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
                            
    );
};

export default OrganizeForm;