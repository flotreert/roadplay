'use client';
import React, { useState, useEffect } from 'react';

// TODO: Replace fakePosts with actual posts from the server
const fakePosts = [
    { id: 1, title: "Fake Post 1", content: "This is the content of fake post 1" },
    { id: 2, title: "Fake Post 2", content: "This is the content of fake post 2" },
    { id: 3, title: "Fake Post 3", content: "This is the content of fake post 3" },
    { id: 1, title: "Fake Post 1", content: "This is the content of fake post 1" },
    { id: 1, title: "Fake Post 1", content: "This is the content of fake post 1" },
    { id: 1, title: "Fake Post 1", content: "This is the content of fake post 1" },
];

const Page: React.FC = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            setIsLoading(true);
            const data = fakePosts;
            setPosts((prevPosts) => [...prevPosts, ...data]);
            setPage((prevPage) => prevPage + 1);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const addPost = () => {
        const newPost = {
            id: posts.length + 1,
            title: "New Post" + (posts.length + 1),
            content: "This is the content of the new post"
        };
        setPosts((prevPosts) => [...prevPosts, newPost]);
    };

    const handleScroll = () => {
        // if (
        //     window.innerHeight + document.documentElement.scrollTop ===
        //     document.documentElement.offsetHeight
        // ) { 
        //     addPost();
        //     fetchPosts();
        // }
        addPost();
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    
    return (
        <main>
            {posts.map((post) => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                </div>
            ))}
            {isLoading && <p>Loading...</p>}
        </main>
    );
};

export default Page;