'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import SignupForm from './signup';
import SignInForm from './signin';
import './auth.css';


const Auth = () => {
    const [isSignin, setIsSignin] = useState(true);

    const toggleAuthModeSignUp = () => {
        setIsSignin(false);
    };
    const toggleAuthModeSignIn = () => {
        setIsSignin(true);
    };

    return (
        <main>
            <div className="auth">
            <div className='description-auth'>
                <Image src="/logo.png" alt="Tournaments Logo" width={'150'} height={'150'}/>
            </div>
            <div className='auth-social-media'>
                    <p style={{fontSize:'medium'}}>Sign in with social media</p>
                    <div className="social-auth">
                        <button className="button-auth-social" >
                            <Image src="/google-logo.png" alt="Google Logo" width={'25'} height={'25'}/>
                        </button>
                        <button className="button-auth-social">
                            <Image src="/facebook-logo.png" alt="Facebook Logo" width={'25'} height={'25'}/>
                        </button>
                    </div>
            </div>
            <div className="change-auth">
                <div className="change-auth-logo">
                    <Image src="/foot.png" alt="Football" width={'15'} height={'15'}/>
                </div>
                <p>Or sign in with </p>
                <div className='change-auth-logo'>
                    <Image src="/basket.png" alt="Basketball" width={'15'} height={'15'}/>
                </div>
            </div>
            <div className="auth-form">
                <div style={{marginBottom:'10px'}}>
                    <button className={`button-auth${isSignin ? '-active' : ''}`} onClick={toggleAuthModeSignIn}>
                        Sign In 
                    </button>
                    <button className={`button-auth${!isSignin ? '-active' : ''}`} onClick={toggleAuthModeSignUp}>
                    Sign Up 
                    </button>
                    </div>
                </div>
                <div>
                    {isSignin ? <SignInForm /> : <SignupForm />}    
                </div>
            </div>
        </main>
    );
};

export default Auth;