import React, { useState } from 'react';
import './auth.css';

const SignupForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Add your sign-up logic here
        console.log('Email:', email);
        console.log('Password:', password);
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