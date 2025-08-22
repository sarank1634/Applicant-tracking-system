import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { usePuterStore } from '~/lib/puter'

export const meta = () => ([
    {title: 'Resumind | Auth'},
    {name: 'description', content: 'log into your account'},
])
 
const auth = () => {
    const {isLoading, auth, puterReady} = usePuterStore();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const next = searchParams.get('next') || '/';
    const navigate = useNavigate();

useEffect(() => {
    console.log('Puter ready:', puterReady, 'Auth state:', auth.isAuthenticated);
    if(puterReady && auth.isAuthenticated && !isLoading) {
        console.log('Navigating to:', next);
        navigate(next, { replace: true });
    }
}, [puterReady, auth.isAuthenticated, isLoading, next, navigate]);
   
   return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen flex items-center justify-center">
      <div className="gradient-b shadow-lg">
      <section className='flex flex-col items-center gap-10 bg-white rounded-2xl p-12'>
        <div className="flex flex-col items-center gap-2 text-center">
            <h1>Welcome</h1>
            <p>Log in to Continue Your Job Journey</p>
        </div>
      </section>
      {isLoading ? (
          <button className='auth-button animated-pluse'>
            Signing you in ...</button>
      ) : (
        <>
        {auth.isAuthenticated ? (
           <button className='auth-button' onClick={auth.signOut}>
            Log Out
           </button> 
        ): (
            <button className='auth-button' onClick={auth.signIn}>
                <p>Log in</p>
            </button>
        )}
        </>
      )}
       </div>
    </main>
  )
}

export default auth;