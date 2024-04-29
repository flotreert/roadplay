'use client';
import React, { useState } from 'react';
import './createPost.css'

const CreatePost: React.FC = () => {
    const sportsTags = ['Football', 'Basketball', 'Tennis', 'Golf', 'Baseball'];
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (selectedTags.includes(value)) {
            setSelectedTags(selectedTags.filter(tag => tag !== value));
        } else {
            setSelectedTags([...selectedTags, value]);
        }
    };

    return (
        <div>
            <form>
                <label>
                    Post:
                    <textarea name="post" required />
                </label>
                <label>
                    Image:
                    <input
                        type="file"
                        name="image"
                        accept=".jpg, .png, .gif"
                        onChange={(e) => {
                            if (document.querySelector('img')) {
                                document.querySelector('img')?.remove();
                            }
                            const file = e.target.files![0];
                            const reader = new FileReader();
                            reader.onload = (event) => {
                                const imageUrl = event.target?.result as string;
                                const imageElement = document.createElement('img');
                                imageElement.src = imageUrl;
                                document.body.appendChild(imageElement);
                            };
                            reader.readAsDataURL(file);
                        }}
                    />
                </label>
                <label>
                    Tags:                   
                    {sportsTags.map((tag) => (
                        <label key={tag}>
                            <input
                                type="checkbox"
                                name="tags"
                                value={tag}
                                checked={selectedTags.includes(tag)}
                                onChange={handleTagChange}
                            />
                            {tag}
                        </label>
                    ))}
                </label>
                <label>
                    Location:
                    <input type="text" name="location" />
                </label>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default CreatePost;