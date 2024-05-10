'use client';
import React, { useEffect, useState } from 'react';
import TagSelector from './tagSelector';
import Image from "next/image";
import './createPost.css';

const CreatePost: React.FC = () => {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        if (files && files[0]) {
            setFile(files[0]);
            const reader = new FileReader();
            reader.onload = () => setPreviewUrl(reader.result as string);
            reader.readAsDataURL(files[0]);
        }
    }

    useEffect(() => {
        if (!file) {
          return
        }
    
        const reader = new FileReader()
    
        reader.onloadend = () => {
          setPreviewUrl(reader.result)
        }
    
        reader.readAsDataURL(file)
      }, [file])


    const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const postValue = formData.get("post");
        console.log(JSON.stringify(Object.fromEntries(formData.entries())));
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
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
                        onChange={handleFileChange} />
                        {previewUrl && <Image src={previewUrl as string} alt="Preview"  width={100} height={100}/>}
                </label>
                <label>
                    Tags:
                    <TagSelector setSelectedTags={setSelectedTags}/>
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