"use client";
import React, { useState } from 'react';
import './tagSelector.css';

function TagSelector({setSelectedTags}: {setSelectedTags: (tags: string[]) => void}): JSX.Element {
    // Define the state to hold the selected value and search query
    const [searchQuery, setSearchQuery] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedTags, ] = useState<string[]>([]); // Remove duplicate declaration of setSelectedTags

    // Define the list of tag
    const tag = [
        { id: 'FOO', name: 'Foot'},
        { id: 'VOL', name: 'Volley' },
        { id: 'TEN', name: 'Tennis' },
        { id: 'BAS', name: 'Basket' },
        { id: 'HAN', name: 'Handball'},
    ];


    // Handle the change event when the user types in the search bar
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    // Filter the list of tag based on the search query
    const filteredTag = tag.filter((tag) => {
        const name = tag.name.toLowerCase();
        return name.includes(searchQuery.toLowerCase())
    }
    );


    // Handle the change event when the user check an option
    const handleCheckboxChange = (tag: { id: string, name: string }) => {
        const tagtr = JSON.stringify(tag);
        if (selectedTags.includes(tagtr)) {
            setSelectedTags(selectedTags.filter((tag) => tag !== tagtr));
        } else {
            setSelectedTags([...selectedTags, tagtr]);
        }
    };


    return (
        <div className='menu'>
            <label className='title'>Tags for your post</label>
            <button className="entry" type="button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                {selectedTags.length === 0 ? 'Select tag' :
                    (<div className='selected-tag'>
                        <div className='selected-tag'>
                            {selectedTags.map((tag, index) => (
                                    <label key={index}>{tag}</label>
                            ))}
                        </div>
                    </div>)
                }</button>
            {
                isDropdownOpen && <div
                    id="tagSelector"
                    className="dropdown-menu">
                    <input
                        className='search-bar'
                        type="text"
                        placeholder={"Search for a tag"}
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <div className="tag-select">
                        {filteredTag.map((tag, index) => (
                            <div className="tag-to-select" key={index}>
                                <input
                                    style={{ marginRight: '10px' }}
                                    type="checkbox"
                                    key={index}
                                    value={tag.name.toLowerCase()}
                                    onChange={() => handleCheckboxChange(tag)} />
                                <label>{tag.name}</label>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </div >

    );
}

export default TagSelector;