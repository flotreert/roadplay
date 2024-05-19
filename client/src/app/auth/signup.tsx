import React, { useState } from 'react';
import { useSignUp } from '../services/auth.service';
import './auth.css';

const SignupForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const {mutate: signUp} = useSignUp();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        signUp({username: username, password: password, email: email})
    };

    return (
        <form onSubmit={handleSubmit} className='form-auth'>
            <div className='input-auth'>
                <label htmlFor="email">Email </label>
                <input 
                    className='input-auth-enter'
                    type="email" 
                    id="email" 
                    value={email} 
                    onChange={handleEmailChange} />
            </div>
            <div className='input-auth'>
                <label>Username </label>
                <input 
                    className='input-auth-enter' 
                    id="username" 
                    value={username} 
                    onChange={handleUsernameChange} />
            </div>
            <div className='input-auth'>
                <label htmlFor="password">Password </label>
                <input 
                    className='input-auth-enter' 
                    type="password" 
                    id="password" 
                    value={password} 
                    onChange={handlePasswordChange} />
            </div>
            <div style={{display:'flex', alignItems:'center'}}>
                <button className='submit-auth-form' type="submit">Sign Up</button>
            </div>
        </form>
    );
};

export default SignupForm;