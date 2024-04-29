import React, { useState } from 'react';
import './auth.css';

const SignInForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // TODO: check auth status
    const  [isSignin, setIsSignin] = useState(false);


    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Add your sign-in logic here
        window.alert(`logging with Email: ${email}, ' Password:, ${password}`);
        setIsSignin(true);
        // TODO: redirect to post page
        window.location.href = '/find-tournament';
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
                    onChange={handleEmailChange}
                    />
            </div>
            <div className='input-auth'>
                <label htmlFor="password">Password </label>
                <input
                    className='input-auth-enter'
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    />
            </div>
            <div style={{display:'flex', alignItems:'center'}}>
                <button className='submit-auth-form' type="submit" onSubmit={handleSubmit}>Sign In</button>
                <a href="/auth/reset-password">Forgot Password?</a>
            </div>
        </form>

    );
};

export default SignInForm;