// `app/auth/page.tsx` is the UI for the `/auth` URL
import React from 'react';
import Auth from './auth';


export default function AuthPage() {
    return <main>
                <div style={{marginTop:'3%'}}>
                    <Auth />
                </div>
            </main>
  }