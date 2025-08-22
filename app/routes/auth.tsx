import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { usePuterStore } from '~/lib/puter'

export const meta = () => ([
    {title: 'Resumind | Auth'},
    {name: 'description', content: 'log into your account'},
])
 
const auth = () => {
    const {isLoading, auth} = usePuterStore();
    const location = useLocation();
    const next = location.search.split('next=')[1];
    const navigate = useNavigate();

useEffect(() => {
if(auth.isAuthenticated) navigate(next);
}, [auth.isAuthendicated, next]);
   
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
            <p>Signing you in ...</p>
        </button>
       ) : (
        <>
        {auth.isAutjenticated ? (
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

export default auth